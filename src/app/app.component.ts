import { Component, OnInit } from '@angular/core';

import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  // Events
  isShowLoading = false;

  constructor(private eventService: EventService) {}

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
