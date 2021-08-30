import { Component, Input, OnInit } from '@angular/core';
import { IGame } from 'src/app/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() game!: IGame;

  constructor() { }

  ngOnInit(): void {
    console.log('game component');
    console.log(this.game);
  }

}
