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
import {HttpRequestType, LoadingStatus} from "../../../store/system/httprequeststatus/http-request-status.reducer";
import {selectStatus} from "../../../store/system/httprequeststatus/http-request-status.selectors";
import {selectJob} from "../../../store/system/job/job.selectors";
import {Job, JobStatus} from "../../../models/system/job.model";
import {selectLanguage} from "../../../store/system/language/language.selectors";

interface TarotRequestModel {
  cards: FormArray<FormControl<TarotCard>>,
  question: FormControl<string>,
}

@Component({
  selector: 'app-tarot-future-telling',
  templateUrl: './tarot-future-telling.component.html',
  styleUrls: ['./tarot-future-telling.component.scss']
})
export class TarotFutureTellingComponent implements OnInit, OnDestroy {

  deck$: Observable<TarotCard[]>;
  response$: Observable<TarotResponse>;
  responseJob$: Observable<Job>;
  requestStatus$: Observable<LoadingStatus>;

  tarotForm: FormGroup<TarotRequestModel>;

  deck: TarotCard[];
  selectedCards: TarotCard[] = [];
  currentJobId: string;
  selectedSystemLanguage = Language.EN;

  private unsubscribe$ = new Subject<void>();
  private checkResponseStatusSubmitting$ = new Subject<void>();

  LOADING_STATUSES = LoadingStatus;

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
      cards: new FormArray<FormControl<TarotCard>>([new FormControl(), new FormControl(), new FormControl()]),
      question: new FormControl(),
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

    // system language
    this.store.select(selectLanguage).pipe(
      takeUntil(this.unsubscribe$),
      filter(language => !!language),
    )
      .subscribe(language => this.selectedSystemLanguage = language);
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
            1000
          );
        }
      });
  }

  sendQuestion() {
    if (this.tarotForm.invalid) {
      return;
    }

    const request = {
      cards: this.tarotForm.controls.cards.value,
      text: this.tarotForm.controls.question.value,
      from: this.selectedSystemLanguage,
      to: Language.EN, // Default for translate to
    }
    this.store.dispatch(TarotActions.askQuestionAsync({request}));
  }

  allFieldsFilled() {
    return this.tarotForm.controls.cards.at(0)?.value
      && this.tarotForm.controls.cards.at(1)?.value
      && this.tarotForm.controls.cards.at(2)?.value
      && this.tarotForm.controls.question?.value
  }

  ngOnDestroy(): void {
    this.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  reset(): void {
    this.selectedCards = [];
    this.tarotForm.controls.cards.setControl(0, new FormControl())
    this.tarotForm.controls.cards.setControl(1, new FormControl())
    this.tarotForm.controls.cards.setControl(2, new FormControl())
    this.tarotForm.controls.question.reset();
    // @ts-ignore
    this.store.dispatch(TarotActions.setResponse({response: null}))
    this.store.dispatch(TarotActions.setAskAsyncJobId({jodId: ''}))
    this.store.dispatch(HttpResponseStatusActions.setStatus({
      updateRequest: {
        type: HttpRequestType.TAROT_REQUEST,
        status: LoadingStatus.INITIAL
      }
    }))
    this.store.dispatch(HttpResponseStatusActions.setStatus({
      updateRequest: {
        type: HttpRequestType.TAROT_REQUEST_ASYNC,
        status: LoadingStatus.INITIAL
      }
    }))
  }

  pullCard(index: number) {
    const tarotCard: TarotCard = this.nextCard();
    // @ts-ignore
    this.tarotForm.controls.cards.setControl(index, new FormControl<TarotCard>(tarotCard));
  }

  nextCard(): TarotCard {
    let cardIndex = Math.floor(Math.random() * this.deck.length);
    let tarotCard: TarotCard = this.deck[cardIndex];
    while (this.selectedCards.includes(tarotCard)) {
      cardIndex = Math.floor(Math.random() * this.deck.length);
      tarotCard = this.deck[cardIndex];
    }
    this.selectedCards.push(tarotCard);
    return tarotCard;
  }

  showCardDetails(index: number) {

  }
}
