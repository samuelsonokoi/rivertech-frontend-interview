import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { GameMockClient, IGame } from 'src/app/shared';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: IGame;
  sub: Subscription = new Subscription();
  id: any;

  constructor(
    private route: ActivatedRoute,
    private gameMockClient: GameMockClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.gameMockClient.getAll$().subscribe(games => {
      this.game = games.filter(g => g.slug === this.id)[0];
      this.addToLastPlayed()
    });

  }

  addToLastPlayed = () => {
    let lastPlayed: IGame[] = this.gameMockClient.getLastPlayedGames();
    
    // check if the game id exist in last played
    let exists = lastPlayed.some((game: any) => game.slug.includes(this.id));

    if (!exists) {
      lastPlayed.push(this.game);
      window.localStorage.setItem('casinoLastPlayed', JSON.stringify(lastPlayed));
    }
  }

}
