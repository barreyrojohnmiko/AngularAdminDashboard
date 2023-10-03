import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

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
  transactionCount: number = 0;
  todayProfit: number = 0;

  isIdDescending: boolean = true;
  isDateDescending: boolean = true;
  isCustomerNameDescending: boolean = true;
  isLocationDescending: boolean = true;
  isAmountDescending: boolean = true;

  isTodayTabClicked: boolean = false;
  isWeeklyTabClicked: boolean = false;
  isMonthlyTabClicked: boolean = false;

  constructor(public dataService: DataService) {}

  getSales(): void {
    this.dataService.getListOfSales().subscribe((result) => {
      // Check if the result is an array, if not, convert it to an array
      const salesData = Array.isArray(result) ? result : [result];
      this.sales = salesData;

      this.handlePanelsData();
    });
  }

  ngOnInit(): void {
    this.getSales();
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

  formatDate(date: string): string {
    return moment(date).format('MMM. D, YYYY');
  }

  calculateTodaySum(salesData: any[]): number {
    const today = new Date(); // Get today's date
    const todayDateString = today.toISOString().split('T')[0]; // Convert to "yyyy-MM-dd" format

    let sum = 0;

    for (const sale of salesData) {
      const createdAtDateString = sale.createdAt.split('T')[0]; // Extract the date part
      if (createdAtDateString === todayDateString) {
        // If the date matches today's date, add the amount to the sum
        sum += parseFloat(sale.amount);
      }
    }

    return sum;
  }

  calculateTotalSum(salesData: any[]): number {
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

  handlePanelsData(): void {
    const sum = this.calculateTotalSum(this.sales);
    this.totalProfit = sum;

    const idCount = this.sales.length;
    this.transactionCount = idCount;

    const todaySum = this.calculateTodaySum(this.sales);
    this.todayProfit = todaySum;
  }

  handleDataSorting(column: string): void {
    switch (column) {
      case 'id':
        this.isIdDescending = !this.isIdDescending;
        this.sortData('id', this.isIdDescending);
        break;
      case 'date':
        this.isDateDescending = !this.isDateDescending;
        this.sortData('date', this.isDateDescending);
        break;
      case 'customerName':
        this.isCustomerNameDescending = !this.isCustomerNameDescending;
        this.sortData('customerName', this.isCustomerNameDescending);
        break;
      case 'amount':
        this.isAmountDescending = !this.isAmountDescending;
        this.sortData('amount', this.isAmountDescending);
        break;
      case 'location':
        this.isLocationDescending = !this.isLocationDescending;
        this.sortData('location', this.isLocationDescending);
        break;
      default:
        break;
    }
  }

  sortData(column: string, isDescending: boolean): void {
    this.sales.sort((a: any, b: any) => {
      switch (column) {
        case 'id':
          return isDescending ? a.id - b.id : b.id - a.id;
        case 'date':
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return isDescending
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        case 'customerName':
          const nameA = a.customerName.toLowerCase();
          const nameB = b.customerName.toLowerCase();
          return isDescending
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        case 'amount':
          return isDescending ? a.amount - b.amount : b.amount - a.amount;
        case 'location':
          const locationA = a.location.toLowerCase();
          const locationB = b.location.toLowerCase();
          return isDescending
            ? locationA.localeCompare(locationB)
            : locationB.localeCompare(locationA);
        default:
          return 0;
      }
    });
  }

  toggleTodayTab(): void {
    this.isTodayTabClicked = true;
    this.isWeeklyTabClicked = false;
    this.isMonthlyTabClicked = false;
  }

  toggleWeeklyTab(): void {
    this.isTodayTabClicked = false;
    this.isWeeklyTabClicked = true;
    this.isMonthlyTabClicked = false;
  }

  toggleMonthlyTab(): void {
    this.isTodayTabClicked = false;
    this.isWeeklyTabClicked = false;
    this.isMonthlyTabClicked = true;
  }
}
