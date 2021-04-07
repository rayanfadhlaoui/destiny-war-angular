import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Information } from '@app/_models/fighter/information';
import { AuthenticationService } from '@app/_services';

@Component({
    selector: 'information',
    templateUrl: './information.html',
    styleUrls: ['./style.css']
})
export class DisplayInformationComponent implements OnInit {
    fighterForm: FormGroup;
    userId: number;

    @Input()
    information: Information;

    constructor(
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.userId = this.authenticationService.currentUserValue.id;
    }
}