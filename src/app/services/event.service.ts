import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  static shared = new EventService();

  alertEvents: EventEmitter<any> = new EventEmitter<any>();
}
