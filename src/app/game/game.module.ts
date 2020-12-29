import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from '../app-routing.module';



@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule
  ]
})
export class GameModule { }
