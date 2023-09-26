import { DashboardPanelsObject } from '../interface/DashboardPanelsObject';

export class DashboardPanelsData {
  dashboardPanels: DashboardPanelsObject[];

  constructor() {
    this.dashboardPanels = [
      {
        label: 'Revenue Day Ratio',
        count: 87000,
      },
      {
        label: 'Total Sales',
        count: 87001,
      },
      {
        label: 'Total Profit',
        count: 87002,
      },
      {
        label: 'Total Users',
        count: 87003  ,
      },
    ];
  }
}
