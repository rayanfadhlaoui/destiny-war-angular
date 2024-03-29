﻿import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { User } from '@app/_models';
import { Fighter } from '@app/_models/fighter/fighter';
import { AuthenticationService } from '@app/_services';
import { MainCharacterService } from '@app/_services/mainCharacter.service';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
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
        public router: Router) { }

    ngOnInit() {
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
    }

    createCharacter() {
        this.router.navigate(['createCharacter'], this.navigationExtras);
    }

    start() {
        this.mainUserService.createGameInformation(this.user.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.gameHasStarted = data;
                },
                error => {
                    this.gameHasStarted = false;
                });

    }
}