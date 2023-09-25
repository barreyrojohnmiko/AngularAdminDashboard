import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {
    this.eventService.alertEvents.subscribe((data: any) => {
      this.isShowLoading = data.status;
    });

    const appToken = localStorage.getItem('appToken');
    if (appToken && appToken.trim().indexOf('') !== -1) {
      this.isLoggedIn = true;
    }
  }
}
