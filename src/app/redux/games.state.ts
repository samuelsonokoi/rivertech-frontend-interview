import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { GameMockClient, IGame } from '../shared';
import { GetAllGames } from './game.action';
import { GameStateModel } from './game.state.model';
import { tap } from 'rxjs/operators';

@State<GameStateModel>({
  name: 'zoo',
  defaults: {
    games: [],
  }
})
@Injectable()
export class GamesState {

  constructor(private gameService: GameMockClient) {}

  @Action(GetAllGames)
  getAllGames(ctx: StateContext<GameStateModel>, action: GetAllGames) {
    return this.gameService.getAll$().pipe(
      tap((allGames: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          games: [...state.games, allGames]
        });
      })
    );
  }

}