import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  static readonly shared = new EventService();

  alertEvents: EventEmitter<any> = new EventEmitter<any>();
}
