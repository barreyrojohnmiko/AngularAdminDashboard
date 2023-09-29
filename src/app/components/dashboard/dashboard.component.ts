import { Component, OnInit } from '@angular/core';

import { DashboardPanelsObject } from 'src/app/objects/interface/DashboardPanelsObject';
import { DashboardPanelsData } from 'src/app/objects/data/DashboardPanelsData';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardPanelsData = new DashboardPanelsData();
  username = 'Miko';

  constructor(public dataService: DataService) {}

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

  getSales(): void {
    this.dataService.getListOfSales().subscribe((result) => {
      console.log('sales: ', result);
    });
  }

  ngOnInit(): void {
    this.getSales();
  }
}
