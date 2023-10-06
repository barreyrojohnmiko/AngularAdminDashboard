import { Component, OnInit } from '@angular/core';

import { EventService } from './services/event.service';

import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  // Events
  isShowLoading = false;

  constructor(
    private eventService: EventService,
    private afMessaging: AngularFireMessaging
  ) {}

  ngOnInit() {
    this.eventService.alertEvents.subscribe((data: any) => {
      this.isShowLoading = data.status;
    });
    this.handlePushNotifications();
  }

  checkSession(value: any): void {
    const appToken = localStorage.getItem('appToken');
    if (appToken && appToken.trim().indexOf('') !== -1) {
      this.isLoggedIn = true;
    }
  }

  handlePushNotifications(): void {
    // Initialize and request permission for receiving push notifications
    this.afMessaging.requestPermission.subscribe(
      () => {
        console.log('Notification permission granted.');
        // Register the device token in your server for sending push notifications
        this.afMessaging.getToken.subscribe(
          (token) => {
            console.log('Device token:', token);
            // Send the token to your server for further processing
          },
          (error) => {
            console.error('Unable to retrieve device token:', error);
          }
        );
      },
      (error) => {
        console.error('Notification permission denied:', error);
      }
    );

    // Receive push notification messages when the app is in the foreground
    this.afMessaging.messages.subscribe(
      (message) => {
        console.log('Received push notification message:', message);
        // Handle the received message
      },
      (error) => {
        console.error('Error receiving push notification:', error);
      }
    );
  }
}
