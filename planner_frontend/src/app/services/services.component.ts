import * as Auth0 from 'auth0-web'
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/index";
import {Service} from "./service.model";
import {ServicesApiService} from "./services-api.service";

@Component({
  selector: 'services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})

export class ServicesComponent implements OnInit, OnDestroy {
  servicesListSubs: Subscription;
  servicesList: Service[];
  authenticated: false;

  constructor(private servicesApi: ServicesApiService) {

  }

  ngOnInit() {
    this.servicesListSubs = this.servicesApi
      .getServices()
      .subscribe(res => {
        this.servicesList = res;
      },
        console.error
      );
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }

  ngOnDestroy() {
    this.servicesListSubs.unsubscribe();
  }

  delete(serviceId: number) {
    this.servicesApi
      .deleteService(serviceId)
      .subscribe(() => {
        this.servicesListSubs = this.servicesApi
          .getServices()
          .subscribe(res => {
            this.servicesList = res;
          },
            console.error
          )
      },
        console.error
      );
  }

  isAdmin() {
    if (!Auth0.isAuthenticated()) return false;
    const rr = Auth0.getProfile();
    // console.log(rr['nickname']);
    // const roles = Auth0.getProfile()['https://online-exams.com/roles'];
    // console.log(roles);
    return rr['nickname'] === 'ozimekwojciech';
    // return false;
  }
}
