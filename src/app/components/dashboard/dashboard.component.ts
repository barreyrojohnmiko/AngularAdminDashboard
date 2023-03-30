import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  numberFormat(x: number) {
    return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
