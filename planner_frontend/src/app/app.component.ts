import * as Auth0 from 'auth0-web';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  authenticated = false;

  signIn = Auth0.signIn;
  sigOut = Auth0.signOut;

  ngOnInit() {
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }
}
