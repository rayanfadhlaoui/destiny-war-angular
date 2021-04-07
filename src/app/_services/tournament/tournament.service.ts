import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Tournament } from '@app/_models/tournament/tournament';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    private currentTournamentsSubject: BehaviorSubject<Array<Tournament>>;
    public currentTournaments: Observable<Array<Tournament>>;

    constructor(private http: HttpClient) {
        this.currentTournamentsSubject = new BehaviorSubject<Array<Tournament>>(JSON.parse(localStorage.getItem('currentTournaments')));
        this.currentTournaments = this.currentTournamentsSubject.asObservable();
    }

    public get currentTournamentValue(): Array<Tournament> {
        return this.currentTournamentsSubject.value;
    }

    getAll() {
        return this.http.get<Array<Tournament>>(`${environment.baseUrl}/tournament/all`)
            .pipe(map(tournaments => {
                if (tournaments != null) {
                    localStorage.setItem('currentTournaments', JSON.stringify(tournaments));
                    this.currentTournamentsSubject.next(tournaments);
                }
                return tournaments;
            }));
    }

    createNewTournament(name: string, participantsNumber: string) {
        return this.http.post<Tournament>(`${environment.baseUrl}/tournament`, { name, participantsNumber })
            .pipe(map(tournament => {
                this.currentTournamentsSubject.value.push(tournament);
                return tournament;
            }));
    }

}