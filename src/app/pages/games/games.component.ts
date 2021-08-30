import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGame, GameMockClient } from 'src/app/shared';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  sub: Subscription = new Subscription();
  games: IGame[] = [];
  p = 1;

	constructor(
		private gameMockClient: GameMockClient
	) {
		
	}

	ngOnInit(): void {
		this.sub = this.gameMockClient.getAll$().subscribe((games: IGame[]) => {
			this.games = games;
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
