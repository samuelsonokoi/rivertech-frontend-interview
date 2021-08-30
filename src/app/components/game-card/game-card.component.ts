import { Component, Input, OnInit } from '@angular/core';
import { IGame } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game!: IGame;
  @Input() link = true;

  constructor() { }

  ngOnInit(): void { }

}
