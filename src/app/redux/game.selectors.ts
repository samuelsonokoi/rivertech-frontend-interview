import { Selector } from '@ngxs/store';
import { IGame } from '../shared';
import { GameStateModel } from './game.state.model';

export class GameSelectors {

  @Selector() static selectAllGames(state: GameStateModel): IGame[] {
    return state.allGames;
  }
  
  @Selector() static selectTrendingGames(state: GameStateModel): IGame[] {
    return state.allGames.filter(game => game.tag === 'trending');
  }
}