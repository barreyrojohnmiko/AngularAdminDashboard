import { Component, OnInit } from '@angular/core';

import { DashboardPanelsData } from 'src/app/objects/data/DashboardPanelsData';
import { DashboardPanelsObject } from 'src/app/objects/interface/DashboardPanelsObject';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardPanelsData = new DashboardPanelsData();
  username = 'Miko';
  sales: any = [];

  constructor(public dataService: DataService) {}

  get dashboardPanels(): DashboardPanelsObject[] {
    return this.dashboardPanelsData.dashboardPanels;
  }

  formatNumber(input: number) {
    let formattedNumber = input.toString();

    // Add commas for thousands
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Split the number into integer and decimal parts
    const parts = formattedNumber.split('.');

    if (parts.length > 1) {
      parts[1] = parts[1].substring(0, 2); // If there's a decimal part, ensure it has two decimal places
    } else {
      parts.push('00'); // If there's no decimal part, add ".00"
    }

    return parts.join('.');
  }

  getSales(): void {
    this.dataService.getListOfSales().subscribe((result) => {
      this.sales = result;
    });
  }

  ngOnInit(): void {
    this.getSales();
  }
}
