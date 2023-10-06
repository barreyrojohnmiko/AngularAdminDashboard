import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public baseService: BaseService) {}

  getListOfSales(): Observable<any> {
    return this.baseService.get('/sales', {});
  }
}
