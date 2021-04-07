import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TournamentComponent } from './tournament.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    TournamentComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [TournamentComponent]
})
export class TournamentModule { }
