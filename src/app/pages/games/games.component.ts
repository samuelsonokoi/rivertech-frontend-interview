import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { GetGame } from 'src/app/redux/game.action';
import { GameSelectors } from 'src/app/redux/game.selectors';
import { GamesState } from 'src/app/redux/games.state';
import { IGame, GameMockClient } from 'src/app/shared';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  sub: Subscription = new Subscription();
  games$: Observable<IGame[]> = new Observable();
  games: IGame[] = [];
  p = 1;
  gameFilter: any = { slug: '' };

  constructor(
    private store: Store,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.games$ = this.store.select(state => state.GameState.allGames);
		this.sub = this.games$.subscribe((games: IGame[]) => {
      this.games = games;
      this.spinner.hide()
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
  }
  
  setSelectedGame = (id: string) => {
    this.store.dispatch(new GetGame(id));
  }

}
