import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fighter } from '@app/_models/fighter/fighter';
import { AuthenticationService } from '@app/_services';

@Component({
    selector: 'fighter',
    templateUrl: './fighter.html',
    styleUrls: ['./style.css']
})
export class DisplayFighterComponent implements OnInit {
    fighterForm: FormGroup;
    userId: number;

    @Input()
    fighter: Fighter;

    constructor(
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.userId = this.authenticationService.currentUserValue.id;
    }

    fullName() {
        return this.fighter.information.firstName;
    }
}