import * as Auth0 from 'auth0-web';

import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from "angular-calendar";
import { CallbackComponent } from './callback.component';
import { ServicesApiService } from './services/services-api.service';
import { ServicesComponent } from "./services/services.component";
import { ServiceFormComponent } from "./services/service-form.component";
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from './calendar/calendar.component';

const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'new-service', component: ServiceFormComponent },
  { path: '', component: ServicesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    ServiceFormComponent,
    ServicesComponent,
    CalendarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    NoopAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [CalendarComponent],
  providers: [ServicesApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'oziomek.auth0.com',
      audience: 'https://online-exam.api.com',
      clientID: '5LX8uP3RxayehLTGKZaI9M6QbekK7G7j',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:services'
    });
  }
}
