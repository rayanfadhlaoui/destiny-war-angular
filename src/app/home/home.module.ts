import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FighterComponent } from '@app/fighters';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent, FighterComponent
  ],
  imports: [CommonModule ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
