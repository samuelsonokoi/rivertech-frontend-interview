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
    });
  }

}
