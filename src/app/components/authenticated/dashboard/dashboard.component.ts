import { Component, OnInit } from '@angular/core';

import { CommonUtilsService } from 'src/app/services/common-utils.service';
import { DashboardService } from 'src/app/services/dashboard.service';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username = 'Miko';

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

  isIdAscending: boolean = true;
  isDateAscending: boolean = true;
  isProductAscending: boolean = true;
  isCustomerNameAscending: boolean = true;
  isLocationAscending: boolean = true;
  isAmountAscending: boolean = true;

  isTodayTabClicked: boolean = false;
  isWeeklyTabClicked: boolean = false;
  isMonthlyTabClicked: boolean = false;

  isNotification: boolean = true;
  isRotateIconClicked: boolean = false;

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
    const todayDateString = today.toISOString().split('T')[0];

    let sum = 0;

    for (const sale of salesData) {
      const createdAtDateString = sale.createdAt.split('T')[0];

      if (createdAtDateString === todayDateString) {
        sum += parseFloat(sale.amount);
      }
    }

    return sum;
  }

  calculateTotalSum(salesData: any[]): number {
    let sum = 0;

    for (const sale of salesData) {
      if (typeof sale.amount === 'string') {
        const amountAsNumber = parseFloat(sale.amount);

        if (!isNaN(amountAsNumber)) {
          sum += amountAsNumber;
        }
      } else if (typeof sale.amount === 'number') {
        sum += sale.amount;
      }
    }

    return sum;
  }

  sortFilteredSalesData(column: string, isAscending: boolean): void {
    let dateA, dateB, productA, productB, nameA, nameB, locationA, locationB;

    this.filteredSalesData.sort((a: any, b: any) => {
      switch (column) {
        case 'id':
          return isAscending ? a.id - b.id : b.id - a.id;
        case 'date':
          dateA = new Date(a.createdAt);
          dateB = new Date(b.createdAt);

          return isAscending
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        case 'product':
          productA = a.productName.toLowerCase();
          productB = b.productName.toLowerCase();

          return isAscending
            ? productA.localeCompare(productB)
            : productB.localeCompare(productA);
        case 'customerName':
          nameA = a.customerName.toLowerCase();
          nameB = b.customerName.toLowerCase();

          return isAscending
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        case 'amount':
          return isAscending ? a.amount - b.amount : b.amount - a.amount;
        case 'location':
          locationA = a.location.toLowerCase();
          locationB = b.location.toLowerCase();

          return isAscending
            ? locationA.localeCompare(locationB)
            : locationB.localeCompare(locationA);
        default:
          return 0;
      }
    });
  }

  handleColumnDataSorting(column: string): void {
    switch (column) {
      case 'id':
        this.isIdAscending = !this.isIdAscending;
        this.sortFilteredSalesData('id', this.isIdAscending);
        break;
      case 'date':
        this.isDateAscending = !this.isDateAscending;
        this.sortFilteredSalesData('date', this.isDateAscending);
        break;
      case 'product':
        this.isProductAscending = !this.isProductAscending;
        this.sortFilteredSalesData('product', this.isProductAscending);
        break;
      case 'customerName':
        this.isCustomerNameAscending = !this.isCustomerNameAscending;
        this.sortFilteredSalesData(
          'customerName',
          this.isCustomerNameAscending
        );
        break;
      case 'amount':
        this.isAmountAscending = !this.isAmountAscending;
        this.sortFilteredSalesData('amount', this.isAmountAscending);
        break;
      case 'location':
        this.isLocationAscending = !this.isLocationAscending;
        this.sortFilteredSalesData('location', this.isLocationAscending);
        break;
      default:
        break;
    }
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

  handleSalesDataReset() {
    this.isRotateIconClicked = !this.isRotateIconClicked;
    this.isIdAscending = true;
    this.isDateAscending = true;
    this.isCustomerNameAscending = true;
    this.isLocationAscending = true;
    this.isAmountAscending = true;
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
