import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServicesApiService} from "./services-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})

export class ServiceFormComponent {
  service = {
    title: '',
    description: '',
    long_description: '',
  };

  constructor(private servicesApi: ServicesApiService, private router: Router) { }

  updateTitle(event: any) {
    this.service.title = event.target.value;
  }

  updateDescription(event: any) {
    this.service.description = event.target.value;
  }

  updateLongDescription(event: any) {
    this.service.long_description = event.target.value;
  }

  saveService() {
    this.servicesApi
      .saveService(this.service)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }
}
