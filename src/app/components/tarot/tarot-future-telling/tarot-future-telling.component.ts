import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {filter, Observable, Subject, takeUntil} from "rxjs";
import {TarotCard, TarotResponse} from "../../../models/tarot/tarot.model";
import {Store} from "@ngrx/store";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import * as TarotActions from "../../../store/tarot/tarot.actions";
import * as JobActions from "../../../store/system/job/job.actions";
import * as HttpResponseStatusActions from "../../../store/system/httprequeststatus/http-request-status.action";
import {selectLastRequestJobId, selectTarotDesk, selectTarotResponse} from "../../../store/tarot/tarot.selectors";
import {TarotResponseViewComponent} from "./tarot-response-view/tarot-response-view.component";
import {Language} from "../../../models/common/language.model";
import {HttpRequestType, LoadingStatus} from "../../../store/system/httprequeststatus/http-request-status.reducer";
import {selectStatus} from "../../../store/system/httprequeststatus/http-request-status.selectors";
import {selectJob} from "../../../store/system/job/job.selectors";
import {Job, JobStatus} from "../../../models/system/job.model";
import {selectLanguage} from "../../../store/system/language/language.selectors";
import {TarotCollocations, TarotCollocationsMap} from "../../../models/tarot/tarot-collocations.model";
import {TarotSelectedCardViewComponent} from "./tarot-selected-card-view/tarot-selected-card-view.component";
import {appearDisappearAnimation} from "../../../animations/appear-disappear-animation";
import {ModalService} from "../../../services/system/modal.service";


interface TarotRequestModel {
  cards: FormArray<FormControl<TarotCard>>,
  question: FormControl<string>,
}

@Component({
  selector: 'app-tarot-future-telling',
  templateUrl: './tarot-future-telling.component.html',
  styleUrls: ['./tarot-future-telling.component.scss'],
  animations: [appearDisappearAnimation]
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
  collocations: TarotCollocations;

  private unsubscribe$ = new Subject<void>();
  private checkResponseStatusSubmitting$ = new Subject<void>();
  private onResponseModalClose: EventEmitter<any> = new EventEmitter<any>();
  private onPageLoadingModalClose: EventEmitter<any> = new EventEmitter<any>();

  responseAlreadyGot = false;
  numberOfGetResponseTries = 0;
  giveUpAfterNumberOfGetResponseTries = 30;

  cardsCount = 3;
  // @ts-ignore
  selectedCardIndexes: number[] = Array(this.cardsCount).fill().map((x, i) => i);

  constructor(
    private store: Store,
    private modalService: ModalService,
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
      filter(respose => !!respose),
    )
      .subscribe(response => {
        this.checkResponseStatusSubmitting$.next();
        this.checkResponseStatusSubmitting$.complete();
        this.onPageLoadingModalClose.emit('close');
        this.modalService.showModal(
          TarotResponseViewComponent,
          {
            response,
            onClose: this.onResponseModalClose,
          },
          {
            showHeader: true,
            transitionOptions: '1000ms',
          }
        );
      });

    // on close response modal
    this.onResponseModalClose.pipe(
      takeUntil(this.unsubscribe$),
    )
      .subscribe(closeEvent => {
        this.resetResponseExpectations();
      });

    // system language
    this.store.select(selectLanguage).pipe(
      takeUntil(this.unsubscribe$),
      filter(language => !!language),
    )
      .subscribe(language => {
        this.selectedSystemLanguage = language;
        // @ts-ignore
        this.collocations = TarotCollocationsMap.get(this.selectedSystemLanguage);
      });
  }

  private subscribeOnResponseJob() {
    this.responseJob$
      .pipe(
        takeUntil(this.checkResponseStatusSubmitting$),
        filter(job => !!job),
        filter(job => JobStatus.RUNNING === job.status || JobStatus.IDLE === job.status),
      )
      .subscribe(job => {
        setTimeout(
          () => {
            this.store.dispatch(JobActions.getJob({jobId: this.currentJobId}));
            this.numberOfGetResponseTries++;
            if (this.numberOfGetResponseTries >= this.giveUpAfterNumberOfGetResponseTries) {
              this.checkResponseStatusSubmitting$.next();
              this.checkResponseStatusSubmitting$.complete();
              this.store.dispatch(HttpResponseStatusActions.setStatus({
                updateRequest: {
                  type: HttpRequestType.TAROT_REQUEST_ASYNC,
                  status: LoadingStatus.FAILED,
                }
              }));
              // считать за ошибку если бэк не доделал джобу за время ожидания
              this.store.dispatch(JobActions.setJobFailed({jobId: this.currentJobId}));
              this.onPageLoadingModalClose.emit('close');
            }
          },
          1500
        );
      });
  }

  sendQuestion() {
    if (this.tarotForm.invalid) {
      return;
    }

    const request = {
      cards: this.tarotForm.controls.cards.value.map(cardFullInfo => ({
        name: cardFullInfo.name,
        id: cardFullInfo.id,
      })),
      text: this.tarotForm.controls.question.value,
      from: this.selectedSystemLanguage,
      to: Language.EN, // Default for translate to
    }
    this.store.dispatch(TarotActions.askQuestionAsync({request}));
    this.modalService.showFullPagePreloaderPopup(
      {
        closeRequest: this.onPageLoadingModalClose,
      }
    );
  }

  allFieldsFilled() {
    let allCardsAreOpened = true;
    for (const cardIndex of this.selectedCardIndexes) {
      allCardsAreOpened = allCardsAreOpened && !!this.tarotForm.controls.cards.at(cardIndex)?.value;
    }
    return !this.responseAlreadyGot && allCardsAreOpened && this.tarotForm.controls.question?.value
  }

  ngOnDestroy(): void {
    this.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  reset(): void {
    this.selectedCards = [];
    for (const cardIndex of this.selectedCardIndexes) {
      this.tarotForm.controls.cards.setControl(cardIndex, new FormControl())
    }
    this.tarotForm.controls.question.reset();

    this.numberOfGetResponseTries = 0;
    this.resetResponseExpectations();
    this.checkResponseStatusSubmitting$ = new Subject<void>();
    this.responseAlreadyGot = false;
  }

  private resetResponseExpectations() {
    // @ts-ignore
    this.store.dispatch(TarotActions.setResponse({response: null}))
    this.store.dispatch(TarotActions.setAskAsyncJobId({jodId: ''}))
    this.store.dispatch(HttpResponseStatusActions.setStatus({
      updateRequest: {
        type: HttpRequestType.TAROT_REQUEST,
        status: LoadingStatus.INITIAL
      }
    }));
    this.store.dispatch(HttpResponseStatusActions.setStatus({
      updateRequest: {
        type: HttpRequestType.TAROT_REQUEST_ASYNC,
        status: LoadingStatus.INITIAL
      }
    }));
    this.responseAlreadyGot = true;
    this.onPageLoadingModalClose.emit('close');
    this.checkResponseStatusSubmitting$.next();
    this.checkResponseStatusSubmitting$.complete();
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
    this.modalService.showModal(
      TarotSelectedCardViewComponent,
      {
        card: this.tarotForm.controls.cards.at(index).value,
      },
      {
        showHeader: true,
        transitionOptions: '500ms',
      }
    );
  }
}
