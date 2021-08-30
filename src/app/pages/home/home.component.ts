import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { GameMockClient, IGame } from "../../shared";

const NAME_KEBAB = "app-home";

@Component({
	templateUrl: "./home.component.html",
	styleUrls: ["./home.scss"],
	host: { class: NAME_KEBAB },
})
export class HomeComponent implements OnInit, OnDestroy {
	sub: Subscription = new Subscription();
	games: IGame[] = [];

	constructor(
		private gameMockClient: GameMockClient
	) {
		
	}

	ngOnInit(): void {
		this.sub = this.gameMockClient.getAll$().subscribe((games: IGame[]) => {
			this.games = games.filter(game => game.tag === 'trending');
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
