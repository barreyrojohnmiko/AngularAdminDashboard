import { DashboardPanelsObject } from '../interface/DashboardPanelsObject';

export class DashboardPanelsData {
  dashboardPanels: DashboardPanelsObject[];

  constructor() {
    this.dashboardPanels = [
      {
        label: 'Revenue Day Ratio',
        count: 87000,
        icon: 'fa-wallet',
      },
      {
        label: 'Total Profit',
        count: 87001,
        icon: 'fa-receipt',
      },
      {
        label: 'Total Users',
        count: 87003,
        icon: 'fa-user',
      },
    ];
  }
}
