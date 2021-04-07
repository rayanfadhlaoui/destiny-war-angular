import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { GameInformation } from '@app/_models/game/gameInformation';

@Injectable({ providedIn: 'root' })
export class GameService {

    constructor(private http: HttpClient) { }

    create(userId: number) {
        return this.http.get<GameInformation>(`${environment.baseUrl}/gameInformation/` + userId)
            .pipe(map(data => {
                return data;
            }));
    }
}