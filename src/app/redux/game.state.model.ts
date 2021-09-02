import { IGame } from '../shared';

export interface GameStateModel {
  allGames: IGame[];
  trendingGames: IGame[];
  selectedGame: any;
  lastAdded: any;
}