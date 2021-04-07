import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Characteristics } from '@app/_models/fighter/characteristics';
import { AuthenticationService } from '@app/_services';

@Component({
    selector: 'characteristic',
    templateUrl: './characteristic.html',
    styleUrls: ['./style.css']
})
export class DisplayCharacteristicComponent implements OnInit {
    fighterForm: FormGroup;
    userId: number;

    @Input()
    characteristic: Characteristics;

    constructor(
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.userId = this.authenticationService.currentUserValue.id;
    }
}