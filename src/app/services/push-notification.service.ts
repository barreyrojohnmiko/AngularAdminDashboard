import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { environment } from 'src/environments/environment';

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  messaging = getMessaging(app);

  constructor() {
    onMessage(this.messaging, (message) => {
      // Handle incoming push message here
      console.log('Received a message', message);
    });
  }

  requestPermission() {
    getToken(this.messaging)
      .then((token) => {
        console.log('Permission granted! Save this token:', token);
        // Send the token to your server for further use.
      })
      .catch((error) => {
        console.error('Permission denied:', error);
      });
  }
}
