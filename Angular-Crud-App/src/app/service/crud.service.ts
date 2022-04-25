import { Injectable } from '@angular/core';
import { User } from '../services/User';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  REST_API: string = 'http://localhost:3000';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/add-user`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  
  GetUsers() {
    return this.httpClient.get(`${this.REST_API}/users`) .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  GetUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }
  
  updateUser(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  
  deleteUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = error.error.message;
    } else {
      
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}