import { Component, OnInit } from "@angular/core";
import { Store } from '@ngxs/store';
import { GetAllGames, GetTrendingGames } from './redux/game.action';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
	constructor(private store: Store) { }

	ngOnInit(): void {
		this.store.dispatch(new GetAllGames());
		this.store.dispatch(new GetTrendingGames());
	}
}
