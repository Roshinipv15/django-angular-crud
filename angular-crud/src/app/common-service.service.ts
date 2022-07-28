import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http: HttpClient) { }

  // public get(url: string): Observable<any> {
  //   return this.http.get(environment.baseURL + url);
  // }

  public post(url: string, data: any): Observable<any> {
    return this.http.post(environment.baseURL + url, data);
  }

  // public delete(url: string): Observable<any> {
  //   return this.http.delete(environment.baseURL + url);
  // }
}
