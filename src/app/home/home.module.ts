import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CreateFighterComponent } from '@app/fighters/create';
import { DisplayFighterComponent } from '@app/fighters/display';
import { DisplayInformationComponent } from '@app/fighters/display/information';
import { DisplayCharacteristicComponent } from '@app/fighters/display/characteristic';

@NgModule({
  declarations: [
    HomeComponent, CreateFighterComponent, DisplayFighterComponent, DisplayInformationComponent, DisplayCharacteristicComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
