import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Fighter } from '@app/_models/fighter/fighter';
import { Observable, of } from 'rxjs';
import { GameService } from './game/game.service';
import { GameInformation } from '@app/_models/game/gameInformation';

@Injectable({ providedIn: 'root' })
export class MainCharacterService {

    fighter: Fighter;
    gameInformation: GameInformation;

    constructor(private http: HttpClient,
        private gameService: GameService) {
        this.fighter = JSON.parse(localStorage.getItem('mainCharacter'));
    }

    hasMainCharacter(userId: number): Observable<Boolean> {
        let isPresent: boolean = true;
        if (localStorage.getItem("mainCharacter") === null) {
            isPresent = false;
            return this.http.get<Fighter>(`${environment.baseUrl}/fighter/mainCharacter/` + userId)
                .pipe(map(data => {
                    if (data != null) {
                        localStorage.setItem('mainCharacter', JSON.stringify(data));
                        this.fighter = data;
                        isPresent = true;
                    }
                    return isPresent;
                }));
        }

        return of(isPresent);
    }

    gameHasStarted(userId: number): Observable<Boolean> {
        let isPresent: boolean = true;
        if (localStorage.getItem("gameInformation") === null) {
            isPresent = false;
            return this.http.get<GameInformation>(`${environment.baseUrl}/gameInformation/` + userId)
                .pipe(map(data => {
                    if (data != null) {
                        localStorage.setItem('gameInformation', JSON.stringify(data));
                        this.gameInformation = data;
                        isPresent = true;
                    }
                    return isPresent;
                }));
        }

        return of(isPresent);
    }

    createGameInformation(userId: number): Observable<Boolean> {
        let isPresent: boolean = false;
        return this.http.post<GameInformation>(`${environment.baseUrl}/gameInformation/create`, userId)
            .pipe(map(data => {
                alert("in it " + JSON.stringify(data));
                if (data != null) {
                    localStorage.setItem('gameInformation', JSON.stringify(data));
                    this.gameInformation = data;
                    isPresent = true;
                }
                return isPresent;
            }));
    }
}