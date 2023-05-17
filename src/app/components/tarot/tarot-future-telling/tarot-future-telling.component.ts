import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {TarotCard, TarotResponse} from "../../../models/tarot/tarot.model";
import {Store} from "@ngrx/store";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import * as TarotActions from "../../../store/tarot/tarot.actions";
import {selectTarotDesk, selectTarotResponse} from "../../../store/tarot/tarot.selectors";
import {DialogService} from "primeng/dynamicdialog";
import {TarotResponseViewComponent} from "./tarot-response-view/tarot-response-view.component";
import {Language} from "../../../models/common/language.model";

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

    private unsubscribe$ = new Subject<void>();

    constructor(
        private store: Store,
        private dialog: DialogService,
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(TarotActions.getDeck({}));

        this.deck$ = this.store.select(selectTarotDesk);
        // @ts-ignore
        this.response$ = this.store.select(selectTarotResponse);

        this.deck$.pipe(
            takeUntil(this.unsubscribe$),
        )
            .subscribe(deck => this.deck = deck);

        this.tarotForm = new FormGroup<TarotRequestModel>({
            cards: new FormArray<FormControl<TarotCard>>([]),
            question: new FormControl(),
            language: new FormControl(),
        });

        this.response$.pipe(
            takeUntil(this.unsubscribe$),
        )
            .subscribe(response => {
                if (response) {
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
        this.store.dispatch(TarotActions.askQuestion({request}));
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
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    reset(): void {
        this.selectedCards = [];
        this.tarotForm.controls.cards.clear();
        this.tarotForm.controls.question.reset();
        this.tarotForm.controls.language.reset();
        // @ts-ignore
        this.store.dispatch(TarotActions.getResponse({response: null}))
    }
}
