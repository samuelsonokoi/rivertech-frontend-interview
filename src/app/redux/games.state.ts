import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GameMockClient, IGame } from '../shared';
import { GetAllGames, GetGame, GetTrendingGames } from './game.action';
import { GameStateModel } from './game.state.model';
import { tap } from 'rxjs/operators';

@State<GameStateModel>({
  name: 'GameState',
  defaults: {
    allGames: [],
    trendingGames: [],
    selectedGame: null,
    lastAdded: null
  }
})

@Injectable()
export class GamesState {

  constructor(private gameService: GameMockClient) { }
  
  @Selector() static selectAllGames(state: GameStateModel): IGame[] {
    return state.allGames;
  }

  @Selector() static selectTrendingGames(state: GameStateModel): IGame[] {
    return state.trendingGames;
  }
  
  @Selector() static selectedGame(state: GameStateModel): IGame {
    return state.selectedGame;
  }

  @Action(GetAllGames)
  getAllGames(ctx: StateContext<GameStateModel>, action: GetAllGames) {
    return this.gameService.getAll$().pipe(
      tap((allGames: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          allGames: allGames
        });
      })
    );
  }
  
  @Action(GetTrendingGames)
  getTrendingGames(ctx: StateContext<GameStateModel>, action: GetTrendingGames) {
    return this.gameService.getAll$().pipe(
      tap((games: IGame[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          trendingGames: games.filter(game => game.tag === 'trending')
        });
      })
    );
  }

  @Action(GetGame)
  getGame(ctx: StateContext<GameStateModel>, action: GetGame) {
    const state = ctx.getState();
    return ctx.setState({
      ...state,
      selectedGame: ctx.getState().allGames.filter(game => game.tag === 'trending')[0]
    });
  }

}