import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { User } from '@app/_models';
import { Fighter } from '@app/_models/fighter/fighter';
import { Tournament } from '@app/_models/tournament/tournament';
import { AuthenticationService } from '@app/_services';
import { MainCharacterService } from '@app/_services/mainCharacter.service';
import { TournamentService } from '@app/_services/tournament/tournament.service';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'tournament.html', 
    styleUrls: ['./style.css']
})
export class TournamentComponent {
    tournamentForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string = '';
    tournaments: Array<Tournament>;
    hasMainCharacter: Boolean;
    gameHasStarted: Boolean;
    user: User;
    fighter: Fighter;
    navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: true
    };

    constructor(
        private authenticationService: AuthenticationService,
        private mainUserService: MainCharacterService,
        private tournamentService: TournamentService,
        public router: Router) { }

    ngOnInit() {

        this.tournamentForm = new FormGroup({
            name: new FormControl('', Validators.required),
            participantsNumber: new FormControl('16', Validators.required),
        });

        this.loading = true;
        this.user = this.authenticationService.currentUserValue;
        this.mainUserService.hasMainCharacter(this.user.id)
            .subscribe(
                data => {
                    this.hasMainCharacter = data;
                    this.fighter = this.mainUserService.fighter;
                    this.loading = false;
                },
                error => {
                    this.authenticationService.logout()
                    this.router.navigate(['login'], this.navigationExtras);
                }
            );
        this.mainUserService.gameHasStarted(this.user.id)
            .subscribe(
                data => {
                    this.gameHasStarted = data;
                    this.loading = false;
                },
                error => {
                }
            );

        this.tournamentService.getAll()
            .pipe(first())
            .subscribe(
                data => {
                    this.tournaments = data;
                },
                error => {
                    this.tournaments = [];
                    this.error = error;
                });
    }

    newTournament() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.tournamentForm.invalid) {
            return;
        }
        let name = this.tournamentForm.value.name;
        let participantsNumber = this.tournamentForm.value.participantsNumber;
        this.tournamentService.createNewTournament(name, participantsNumber)
            .pipe(first())
            .subscribe(
                data => {
                   // this.tournaments.push(data);
                },
                error => {
                    this.error = error;
                });

    }
}