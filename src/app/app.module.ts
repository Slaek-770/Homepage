import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageModule } from "./homepage/homepage.module";
import { BasepageComponent } from './basepage/basepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizpokerModule } from "./quizpoker/quizpoker.module";

@NgModule({
  declarations: [
    AppComponent,
    BasepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomepageModule,
    QuizpokerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
