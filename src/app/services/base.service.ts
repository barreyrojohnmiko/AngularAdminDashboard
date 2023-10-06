import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  baseUrl = 'https://631151ac19eb631f9d70a329.mockapi.io';

  constructor(public http: HttpClient) {}

  getFullURL(urlString: string): string {
    return this.baseUrl + urlString;
  }

  get<T>(urlString: string, params: object): Observable<T> {
    return this.http.get<T>(this.getFullURL(urlString), params);
  }
}
