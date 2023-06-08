import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BoardComponent } from './board/board.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PlayerComponent } from './player/player.component';
import {MatIconModule} from "@angular/material/icon";
import { ModeratorViewComponent } from './board/moderator-view/moderator-view.component';
import { LogOutputComponent } from './logger/log-output/log-output.component';

@NgModule({
  declarations: [
    BoardComponent,
    PlayerComponent,
    ModeratorViewComponent,
    LogOutputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule
  ]
})
export class QuizpokerModule { }
