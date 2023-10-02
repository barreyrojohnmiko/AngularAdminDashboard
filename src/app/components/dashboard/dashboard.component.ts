import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username = 'Miko';
  sales: any = [];
  totalProfit: number = 0;

  constructor(public dataService: DataService) {}

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
      // Check if the result is an array, if not, convert it to an array
      const salesData = Array.isArray(result) ? result : [result];

      // Assign the sales data
      this.sales = salesData;

      // Calculate the sum of sales amounts
      const sum = this.calculateSum(salesData);
      this.totalProfit = sum;
    });
  }

  calculateSum(salesData: any[]): number {
    let sum = 0;

    for (const sale of salesData) {
      if (typeof sale.amount === 'string') {
        // Convert the amount string to a number, assuming the string is a valid numeric representation
        const amountAsNumber = parseFloat(sale.amount);

        if (!isNaN(amountAsNumber)) {
          sum += amountAsNumber;
        }
      } else if (typeof sale.amount === 'number') {
        // If the amount is already a number, add it directly
        sum += sale.amount;
      }
    }

    return sum;
  }

  ngOnInit(): void {
    this.getSales();
  }
}
