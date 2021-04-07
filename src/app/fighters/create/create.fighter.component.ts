import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Information } from '@app/_models/fighter/information';
import { AuthenticationService } from '@app/_services';
import { FighterService } from '@app/_services/fighter.service';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './fighter.html',
    styleUrls: ['./style.css']
})
export class CreateFighterComponent implements OnInit {
    fighterForm: FormGroup;
    submitted = false;
    userId: number;

    constructor(
        private fighterService: FighterService,
        private authenticationService: AuthenticationService,
        public router: Router) { }

    ngOnInit() {
        this.userId = this.authenticationService.currentUserValue.id;

        this.fighterForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            race: new FormControl('Human', Validators.required),
            gender: new FormControl('Male', Validators.required),
            age: new FormControl('', Validators.required),
            class: new FormControl('No class', Validators.required)
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.fighterForm.invalid) {
            return;
        }
        let fighterInformation: Information = this.fighterForm.value;
        this.fighterService.create(this.userId, fighterInformation)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(JSON.stringify(data));
                    localStorage.setItem('mainCharacter', JSON.stringify(data));
                    const navigationExtras: NavigationExtras = {
                        queryParamsHandling: 'preserve',
                        preserveFragment: true
                    };
                    this.router.navigate(['home'], navigationExtras);
                },
                error => {
                    alert(error)
                });
    }
}