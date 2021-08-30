export interface IGame {
  id: string;
  slug: string;
  title: string;
  tag: string;
  providerName: string;
  startUrl: string;
  thumb?: IThumb
}

export interface IThumb {
  url: string;
  title: string;
}