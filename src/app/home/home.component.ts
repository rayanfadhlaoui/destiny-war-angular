import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    usersConnected: User[] = [];
    user: User;

    constructor(
        private authenticationService: AuthenticationService, 
        public router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.user = this.authenticationService.currentUserValue;
        console.log(JSON.stringify(this.user));

        this.usersConnected.push(this.user);
        this.loading = false;
        /*this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });*/
    }

    createCharacter() {
        const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
        };
        this.router.navigate(['createCharacter'], navigationExtras);
    }
}