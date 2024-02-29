import { Component, OnInit } from '@angular/core';

import { DashboardService } from 'src/app/services/dashboard.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username = 'Miko';

  isIdDescending: boolean = true;
  isDateDescending: boolean = true;
  isProductDescending: boolean = true;
  isCustomerNameDescending: boolean = true;
  isLocationDescending: boolean = true;
  isAmountDescending: boolean = true;

  isTodayTabClicked: boolean = false;
  isWeeklyTabClicked: boolean = false;
  isMonthlyTabClicked: boolean = false;

  isNotification: boolean = true;
  isRotateIconClicked: boolean = false;

  selectOptions = [
    { value: 'productName', label: 'Product' },
    { value: 'customerName', label: 'Customer Name' },
    { value: 'location', label: 'Location' },
    { value: 'amount', label: 'Amount' },
  ];
  categoryPicked: string = this.selectOptions[0].value;

  searchInput: string = '';

  salesData: any = [];
  filteredSalesData: any = [];

  todayProfit: number = 0;
  totalProfit: number = 0;
  transactionCount: number = 0;

  constructor(
    public dashboardService: DashboardService,
    public commonUtilsService: CommonUtilsService
  ) {}

  GetSales(): void {
    this.dashboardService.getListOfSales().subscribe((result) => {
      // Check if the result is an array, if not, convert it to an array
      const salesData = Array.isArray(result) ? result : [result];
      this.salesData = salesData;
      this.filteredSalesData = salesData;

      this.handlePanelsData();
    });
  }

  ngOnInit(): void {
    this.GetSales();
  }

  handlePanelsData(): void {
    const sum = this.calculateTotalSum(this.filteredSalesData);
    this.totalProfit = sum;

    const idCount = this.filteredSalesData.length;
    this.transactionCount = idCount;

    const todaySum = this.calculateTodaySum(this.filteredSalesData);
    this.todayProfit = todaySum;
  }

  calculateTodaySum(salesData: any[]): number {
    const today = new Date();
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
      case 'product':
        this.isProductDescending = !this.isProductDescending;
        this.sortData('product', this.isProductDescending);
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
    this.filteredSalesData.sort((a: any, b: any) => {
      switch (column) {
        case 'id':
          return isDescending ? a.id - b.id : b.id - a.id;
        case 'date':
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return isDescending
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        case 'product':
          const productA = a.productName.toLowerCase();
          const productB = b.productName.toLowerCase();
          return isDescending
            ? productA.localeCompare(productB)
            : productB.localeCompare(productA);
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

  toggleTab(timespan: string): void {
    switch (timespan) {
      case 'today':
        this.isTodayTabClicked = true;
        this.isWeeklyTabClicked = false;
        this.isMonthlyTabClicked = false;
        this.filterDataByTimeSpan('today');
        break;

      case 'weekly':
        this.isTodayTabClicked = false;
        this.isWeeklyTabClicked = true;
        this.isMonthlyTabClicked = false;
        this.filterDataByTimeSpan('weekly');
        break;

      case 'monthly':
        this.isTodayTabClicked = false;
        this.isWeeklyTabClicked = false;
        this.isMonthlyTabClicked = true;
        this.filterDataByTimeSpan('monthly');
        break;

      default:
        break;
    }
  }

  filterDataByTimeSpan(timespan: string): void {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const todayStart = moment.tz(userTimeZone).startOf('day');
    const todayEnd = moment(todayStart).endOf('day');

    console.log(`User's Time Zone: `, userTimeZone);

    switch (timespan) {
      case 'today':
        this.filteredSalesData = this.salesData.filter((item: any) => {
          const createdAt = moment.tz(item.createdAt, userTimeZone);
          const userCreatedAt = createdAt.clone().tz(userTimeZone);

          return userCreatedAt.isBetween(todayStart, todayEnd);
        });
        break;
      case 'weekly':
        const endOfWeek = todayEnd;
        const sixDaysAgo = todayStart.clone().subtract(6, 'days');

        this.filteredSalesData = this.salesData.filter((item: any) => {
          const createdAt = moment.tz(item.createdAt, userTimeZone);
          const userCreatedAt = createdAt.clone().tz(userTimeZone);

          return userCreatedAt.isBetween(sixDaysAgo, endOfWeek);
        });
        break;
      case 'monthly':
        const year = todayStart.year();
        const month = todayStart.month();
        const startOfMonth = moment.tz([year, month], userTimeZone);
        const endOfMonth = startOfMonth.clone().endOf('month');

        this.filteredSalesData = this.salesData.filter((item: any) => {
          const createdAt = moment.tz(item.createdAt, userTimeZone);
          return createdAt.isBetween(startOfMonth, endOfMonth, null, '[]');
        });
        break;
      default:
        break;
    }
  }

  handleDataReset() {
    this.isRotateIconClicked = !this.isRotateIconClicked;
    this.isIdDescending = true;
    this.isDateDescending = true;
    this.isCustomerNameDescending = true;
    this.isLocationDescending = true;
    this.isAmountDescending = true;
    this.isTodayTabClicked = false;
    this.isWeeklyTabClicked = false;
    this.isMonthlyTabClicked = false;
    this.filteredSalesData = this.salesData;
  }

  handleSearchInput() {
    this.filteredSalesData = this.salesData.filter((sale: any) => {
      switch (this.categoryPicked) {
        case 'productName':
          return sale.productName
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        case 'customerName':
          return sale.customerName
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        case 'location':
          return sale.location
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        case 'amount':
          return sale.amount.toString().includes(this.searchInput);
        default:
          return false;
      }
    });
  }
}
