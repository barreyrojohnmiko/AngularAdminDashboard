import { Component } from '@angular/core';

import { DashboardPanelsObject } from 'src/app/objects/interface/DashboardPanelsObject';
import { DashboardPanelsData } from 'src/app/objects/data/DashboardPanelsData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dashboardPanelsData = new DashboardPanelsData();
  username = 'Miko';

  constructor() {}

  get dashboardPanels(): DashboardPanelsObject[] {
    return this.dashboardPanelsData.dashboardPanels;
  }
}
