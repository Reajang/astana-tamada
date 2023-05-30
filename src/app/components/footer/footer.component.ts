import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TarotCollocations, TarotCollocationsMap} from "../../models/tarot/tarot-collocations.model";
import {selectLanguage} from "../../store/system/language/language.selectors";
import {filter, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {AppRouteConstants} from "../../app.constants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  collocations: TarotCollocations;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectLanguage).pipe(
      takeUntil(this.unsubscribe$),
      filter(language => !!language),
    )
      .subscribe(language => {
        // @ts-ignore
        this.collocations = TarotCollocationsMap.get(language);
      });
  }

  isTarot(): boolean {
    return this.router.url?.startsWith(AppRouteConstants.tarotStartPath);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
