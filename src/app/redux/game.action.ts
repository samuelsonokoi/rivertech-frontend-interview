export class GetAllGames {
  static readonly type = '[Games] Get All Games';
}

export class GetTrendingGames {
  static readonly type = '[Games] Get Trending Games';
}

export class GetGame {
  static readonly type = '[Games] Get Game';
  constructor(public readonly payload: string) {}
}