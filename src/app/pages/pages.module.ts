import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppPagesRoutingModule } from "./pages-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { HomeComponent } from "./home/home.component";
import { GamesComponent } from './games/games.component';
import { GameCardComponent } from '../components/game-card/game-card.component';
import { GameComponent } from './game/game.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LastPlayedComponent } from '../components/last-played/last-played.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
	HomeComponent,
	GamesComponent,
	GameCardComponent,
	GameComponent,
	LastPlayedComponent
];

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
		NgxPaginationModule,
		NgxSpinnerModule,
		FilterPipeModule,
		FormsModule,
		BrowserAnimationsModule
	],
	declarations: [
		...COMPONENTS,
	],
	exports: [
		...COMPONENTS
	]
})
export class AppPagesModule {

}
