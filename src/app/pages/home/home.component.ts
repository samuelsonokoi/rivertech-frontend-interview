import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from "rxjs";

import { IGame } from "../../shared";

const NAME_KEBAB = "app-home";

@Component({
	templateUrl: "./home.component.html",
	styleUrls: ["./home.scss"],
	host: { class: NAME_KEBAB },
})
export class HomeComponent implements OnInit, OnDestroy {
	sub: Subscription = new Subscription();
	trendingGames$: Observable<IGame[]> = new Observable();
	trendingGames: IGame[] = [];

	constructor(
    private store: Store,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.trendingGames$ = this.store.select(state => state.GameState.trendingGames);
		this.sub = this.trendingGames$.subscribe((games: IGame[]) => {
      this.trendingGames = games;
      this.spinner.hide()
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
