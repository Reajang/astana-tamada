import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Observable, Subject, takeUntil} from "rxjs";
import {TarotCard, TarotResponse} from "../../../models/tarot/tarot.model";
import {Store} from "@ngrx/store";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import * as TarotActions from "../../../store/tarot/tarot.actions";
import * as JobActions from "../../../store/system/job/job.actions";
import * as HttpResponseStatusActions from "../../../store/system/httprequeststatus/http-request-status.action";
import {selectLastRequestJobId, selectTarotDesk, selectTarotResponse} from "../../../store/tarot/tarot.selectors";
import {DialogService} from "primeng/dynamicdialog";
import {TarotResponseViewComponent} from "./tarot-response-view/tarot-response-view.component";
import {Language} from "../../../models/common/language.model";
import {HttpRequestStatus, HttpRequestType} from "../../../store/system/httprequeststatus/http-request-status.reducer";
import {selectStatus} from "../../../store/system/httprequeststatus/http-request-status.selectors";
import {selectJob} from "../../../store/system/job/job.selectors";
import {Job, JobStatus} from "../../../models/system/job.model";

interface TarotRequestModel {
  cards: FormArray<FormControl<TarotCard>>,
  question: FormControl<string>,
  language: FormControl<Language>,
}

@Component({
  selector: 'app-tarot-future-telling',
  templateUrl: './tarot-future-telling.component.html',
  styleUrls: ['./tarot-future-telling.component.scss']
})
export class TarotFutureTellingComponent implements OnInit, OnDestroy {

  deck$: Observable<TarotCard[]>;
  deck: TarotCard[];
  selectedCards: TarotCard[] = [];
  tarotForm: FormGroup<TarotRequestModel>;

  response$: Observable<TarotResponse>;
  currentJobId: string;
  responseJob$: Observable<Job>;

  requestStatus$: Observable<HttpRequestStatus>;

  private unsubscribe$ = new Subject<void>();
  private checkResponseStatusSubmitting$ = new Subject<void>();


  constructor(
    private store: Store,
    private dialog: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.dispatches();
    this.selections();
    this.subscriptions();
  }

  private initForm() {
    this.tarotForm = new FormGroup<TarotRequestModel>({
      cards: new FormArray<FormControl<TarotCard>>([]),
      question: new FormControl(),
      language: new FormControl(),
    });
  }


  private dispatches() {
    this.store.dispatch(TarotActions.getDeck({}));
  }

  private selections() {
    this.deck$ = this.store.select(selectTarotDesk);
    // @ts-ignore
    this.response$ = this.store.select(selectTarotResponse);
    // @ts-ignore
    this.requestStatus$ = this.store.select(selectStatus(HttpRequestType.TAROT_REQUEST_ASYNC));
  }

  private subscriptions() {
    // all deck
    this.deck$.pipe(
      takeUntil(this.unsubscribe$),
    )
      .subscribe(deck => this.deck = deck);

    // dispatch job from id
    this.store.select(selectLastRequestJobId)
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(jobId => {
        if (jobId) {
          this.currentJobId = jobId;
          this.store.dispatch(JobActions.getJob({jobId}));
          // @ts-ignore
          this.responseJob$ = this.store.select(selectJob(jobId));
          this.subscribeOnResponseJob();
        }
      });

    // response
    this.response$.pipe(
      takeUntil(this.unsubscribe$),
    )
      .subscribe(response => {
        if (response) {
          this.checkResponseStatusSubmitting$.next();
          this.checkResponseStatusSubmitting$.complete();
          this.dialog.open(TarotResponseViewComponent, {
            showHeader: true,
            transitionOptions: '0ms',
            data: {
              response
            }
          });
        }
      });
  }

  private subscribeOnResponseJob() {
    this.responseJob$
      .pipe(
        takeUntil(this.checkResponseStatusSubmitting$),
        filter(job => JobStatus.RUNNING === job?.status || JobStatus.IDLE === job?.status),
      )
      .subscribe(job => {
        if (job) {
          setTimeout(
            () => this.store.dispatch(JobActions.getJob({jobId: this.currentJobId})),
            500
          );
        }
      });
  }

  nextCard() {
    let cardIndex = Math.floor(Math.random() * this.deck.length);
    let tarotCard: TarotCard = this.deck[cardIndex];
    while (this.selectedCards.includes(tarotCard)) {
      cardIndex = Math.floor(Math.random() * this.deck.length);
      tarotCard = this.deck[cardIndex];
    }
    this.selectedCards.push(tarotCard);
    // @ts-ignore
    this.tarotForm.controls.cards.push(new FormControl<TarotCard>(tarotCard));
  }

  sendQuestion() {
    if (this.tarotForm.invalid) {
      return;
    }

    const request = {
      cards: [
        {
          name: this.tarotForm.controls.cards.at(0).value.name,
        },
        {
          name: this.tarotForm.controls.cards.at(1).value.name,
        },
        {
          name: this.tarotForm.controls.cards.at(2).value.name,
        }
      ],
      text: this.tarotForm.controls.question.value,
      from: this.tarotForm.controls.language.value || Language.EN,
      to: Language.EN,
    }
    this.store.dispatch(TarotActions.askQuestionAsync({request}));
  }

  allFieldsFilled() {
    return this.tarotForm.controls.cards.at(0)?.value
      && this.tarotForm.controls.cards.at(1)?.value
      && this.tarotForm.controls.cards.at(2)?.value
      && this.tarotForm.controls.question?.value
  }

  canPullAnotherCard(): boolean {
    return !(this.tarotForm.controls.cards.at(0)?.value
      && this.tarotForm.controls.cards.at(1)?.value
      && this.tarotForm.controls.cards.at(2)?.value);
  }

  ngOnDestroy(): void {
    this.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  reset(): void {
    this.selectedCards = [];
    this.tarotForm.controls.cards.clear();
    this.tarotForm.controls.question.reset();
    this.tarotForm.controls.language.reset();
    // @ts-ignore
    this.store.dispatch(TarotActions.setResponse({response: null}))
    this.store.dispatch(TarotActions.setAskAsyncJobId({jodId: ''}))
    this.store.dispatch(HttpResponseStatusActions.setStatus({
      updateRequest: {
        type: HttpRequestType.TAROT_REQUEST,
        status: HttpRequestStatus.INITIAL
      }
    }))
    this.store.dispatch(HttpResponseStatusActions.setStatus({
      updateRequest: {
        type: HttpRequestType.TAROT_REQUEST_ASYNC,
        status: HttpRequestStatus.INITIAL
      }
    }))
  }
}
