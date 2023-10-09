import { Component, OnInit } from '@angular/core';

import { EventService } from './services/event.service';

import { environment } from 'src/environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isShowLoading = false;

  title = 'af-notification';
  message: any = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.alertEvents.subscribe((data: any) => {
      this.isShowLoading = data.status;
    });
    this.requestPermission();
    this.listen();
  }

  checkSession(value: any): void {
    const appToken = localStorage.getItem('appToken');
    if (appToken && appToken.trim().indexOf('') !== -1) {
      this.isLoggedIn = true;
    }
  }

  requestPermission() {
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Hurraaa!!! we got the token.....');
          console.log(currentToken);
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  }
  
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }
}
