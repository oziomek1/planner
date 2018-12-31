import * as Auth0 from 'auth0-web';
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {throwError} from "rxjs/index";
import {catchError, tap} from "rxjs/internal/operators";
import {API_URL} from "../env";
import {Service} from "./service.model";


@Injectable()
export class ServicesApiService {
  constructor(private http: HttpClient) {

  }

  private static _handlerError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
    // return Observable.throw(err.message)
  }

  getServices(): Observable<Service[]> {
    const httpOptions = {
      headers: new HttpHeaders('application/json')
    };
    return this.http.get<Service[]>(`${API_URL}/services`, httpOptions)
      .pipe(
        catchError(ServicesApiService._handlerError)
      );
  }

  saveService(service: Service): Observable<any> {
    console.log(service);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    console.log(httpOptions);
    return this.http.post(`${API_URL}/services`, service, httpOptions)
      .pipe(
        catchError(ServicesApiService._handlerError)
      );
  }

  deleteService(serviceId: Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http.delete(`${API_URL}/services/${serviceId}`, httpOptions)
      .pipe(
        catchError(ServicesApiService._handlerError)
      );
  }
}
