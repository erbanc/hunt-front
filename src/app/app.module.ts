import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HomeModule} from "./home/home.module";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { QuestionComponent } from './question/question.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    PageNotFoundComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CookieService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
