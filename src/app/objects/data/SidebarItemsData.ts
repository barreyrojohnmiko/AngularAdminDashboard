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
        onClick: this.handleSideMenuClick.bind(this, 'dashboard'),
      },
      {
        label: 'Profile',
        icon: 'fa-solid fa-chart-simple',
        tooltip: 'Profile',
        onClick: this.handleSideMenuClick.bind(this, 'profile'),
      },
    ];
  }

  handleSideMenuClick(route: string) {
    switch (route) {
      case 'dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      default:
        break;
    }
  }
}
