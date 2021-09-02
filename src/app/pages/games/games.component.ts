import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { GetGame } from 'src/app/redux/game.action';
import { IGame } from 'src/app/shared';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  sub: Subscription = new Subscription();
  games$: Observable<IGame[]> = new Observable();
  games: IGame[] = [];
  filteredGames: IGame[] = [];
  p = 1;
  search: string = '';
  providers: string[] = [];
  selectedProviders: string[] = [];

  constructor(
    private store: Store,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.games$ = this.store.select(state => state.GameState.allGames);
		this.sub = this.games$.subscribe((games: IGame[]) => {
      this.games = games;
      this.filteredGames = games;
      this.populateProviders();
      this.spinner.hide()
    });

    // check for route query params
    this.route.queryParams
      .subscribe((params: any) => {
        if (params.searchTerm) {
          this.search = params.searchTerm;
          this.selectedProviders = params.provider ? params.provider.split('-') : [];
          this.searchForGame();
        }
      }
    );

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
  }
  
  setSelectedGame = (id: string) => {
    this.store.dispatch(new GetGame(id));
  }

  searchForGame = () => {
    setTimeout(() => {
      if (this.search !== '') {
        // run search if the search string is not empty
        this.router.navigate(['/games'],
          {
            queryParams: { searchTerm: this.search },
            queryParamsHandling: 'merge'
          });
        this.games = this.games.filter(game => game.title.toLowerCase().includes(this.search));

        // only run this when there is a selected provider
        if (this.selectedProviders.length > 0) {
          this.router.navigate(['/games'],
            {
              queryParams: { searchTerm: this.search, provider: this.selectedProviders.join('-') },
              queryParamsHandling: 'merge'
            });
          this.games = this.games.filter(game => game.title.toLowerCase().includes(this.search) && game.providerName.includes(this.selectedProviders.join(' ')));
        } else {
          this.router.navigate(['/games'],
          {
            queryParams: { searchTerm: this.search }
          });
        }
      } else {
        this.games = this.filteredGames;
        this.router.navigate(['/games']);
      }
    }, 500);
  }

  populateProviders = () => {
    let providers: string[] = [];
    this.games.forEach(game => {
      if (!this.isExists(providers, game.providerName)) {
        providers.push(game.providerName);
      }
    });
    this.providers = providers;
  }

  clearFilter = () => {
    this.selectedProviders = [];
  }

  isExists = (arr: any[], value: string): boolean => {
    let exists = arr.some(provider => provider.includes(value));
    return exists;
  }
  
  modifyProviders = (provider: string) => {
    // add to selected providers if it doesn't exist
    if (this.isExists(this.selectedProviders, provider)) {
      this.selectedProviders.splice(this.selectedProviders.indexOf(provider), 1);
    } else {
      this.selectedProviders.push(provider);
    }

    // rerun searchForGame to effect the provider changes
    this.searchForGame();
  };

}
