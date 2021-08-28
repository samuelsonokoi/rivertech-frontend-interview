import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { GameMockClient, Game } from "../../shared";

const NAME_KEBAB = "app-home";

@Component({
	templateUrl: "./home.component.html",
	styleUrls: ["./home.scss"],
	host: { class: NAME_KEBAB },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

	gamesData$: Observable<Game[]>;

	constructor(
		gameMockClient: GameMockClient
	) {
		this.gamesData$ = gameMockClient.getAll$();
	}
}
