import { Injectable } from '@angular/core';
import { getMessaging, onMessage } from 'firebase/messaging';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  messaging = getMessaging();

  constructor() {
    this.setupMessageListener();
  }

  setupMessageListener() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. Data:', payload.data);
    });
  }
}
