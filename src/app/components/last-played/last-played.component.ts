import { Component, OnInit } from '@angular/core';
import { GameMockClient, IGame } from 'src/app/shared';

@Component({
  selector: 'app-last-played',
  templateUrl: './last-played.component.html',
  styleUrls: ['./last-played.component.scss']
})
export class LastPlayedComponent implements OnInit {
  lastPlayedGames: IGame[] = [];

  constructor(private gameMockClient: GameMockClient) { }

  ngOnInit(): void {
    this.lastPlayedGames = this.gameMockClient.getLastPlayedGames();
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

}
