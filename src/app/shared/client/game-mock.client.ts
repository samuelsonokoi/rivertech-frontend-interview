import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IGame } from 'src/app/models/game.model';

@Injectable({
	providedIn: "root"
})
export class GameMockClient {

	private readonly dataURL = "assets/game.mock-data.json";

	constructor(
		private http: HttpClient
	) {
	}

	getAll$(): Observable<IGame[]> {
		return this.http.get<IGame[]>(this.dataURL);
	}

}
