import { Router } from '@angular/router';
import { SidebarItemsObject } from '../interface/SidebarItemsObject';

export class SidebarItemsData {
  sidebarItems: SidebarItemsObject[];

  constructor(private router: Router) {
    this.sidebarItems = [
      {
        label: 'Dashboard',
        icon: 'fa-solid fa-chart-simple',
        tooltip: 'Dashboard',
        onClick: this.handleDashboardClick.bind(this),
      },
      {
        label: 'Lorem Ipsum',
        icon: 'fa-solid fa-chart-simple',
      },
    ];
  }

  // Methods
  handleDashboardClick() {
    this.router.navigate(['/dashboard']);
  }
}
