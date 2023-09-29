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

  formatNumber(input: number) {
    const numericValue = input.toString().replace(/[^0-9]/g, '');

    const length = numericValue.length;
    const integerPart = numericValue.substring(0, length - 2);
    const decimalPart = numericValue.substring(length - 2, length);

    return (
      integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + decimalPart
    );
  }
}
