import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Fighter } from '@app/_models/fighter/fighter';
import { Information } from '@app/_models/fighter/information';

@Injectable({ providedIn: 'root' })
export class FighterService {

    constructor(private http: HttpClient) { }

    create(userId: number, information: Information) {
        return this.http.post<Fighter>(`${environment.baseUrl}/fighter`, {userId, information})
            .pipe(map(figther => {
                return figther;
            }));
    }
}