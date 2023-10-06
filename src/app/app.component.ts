import { Component, OnInit } from '@angular/core';

import { EventService } from './services/event.service';

import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs/operators';

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
  ) {
    afMessaging.messages.subscribe((message) => {
      console.log('Received a message: ', message);
    });

    afMessaging.requestPermission.pipe(take(1)).subscribe(
      (token) => {
        console.log('Permission granted!', token);
      },
      (error) => {
        console.error('Permission denied!', error);
      }
    );
  }

  ngOnInit() {
    this.eventService.alertEvents.subscribe((data: any) => {
      this.isShowLoading = data.status;
    });
  }

  checkSession(value: any): void {
    const appToken = localStorage.getItem('appToken');
    if (appToken && appToken.trim().indexOf('') !== -1) {
      this.isLoggedIn = true;
    }
  }
}
