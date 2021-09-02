import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGame } from 'src/app/models/game.model';
import { GetGame } from 'src/app/redux/game.action';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game!: IGame;
  @Input() link = true;
  @Input() lastPlayed = false;

  constructor(private store: Store) { }

  ngOnInit(): void { }
  
  selectGame = () => {
    this.store.dispatch(new GetGame(this.game.slug));
  }

}
