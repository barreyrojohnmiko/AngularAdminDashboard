import { Component, OnInit } from '@angular/core';

import { CommonUtils } from 'src/app/services/common-utils';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EventService } from 'src/app/services/event.service';
import { SubjectService } from 'src/app/services/subject.service';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  name = 'Miko';

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

  isIdDescending: boolean = false;
  isDateDescending: boolean = false;
  isProductDescending: boolean = false;
  isCustomerNameDescending: boolean = false;
  isLocationDescending: boolean = false;
  isAmountDescending: boolean = false;

  isTodayTabClicked: boolean = false;
  isWeeklyTabClicked: boolean = false;
  isMonthlyTabClicked: boolean = false;

  isNotification: boolean = true;
  isRotateIconClicked: boolean = false;

  constructor(
    public dashboardService: DashboardService,
    public commonUtils: CommonUtils,
    private eventService: EventService,
    private subjectService: SubjectService
  ) {}

  GetSales(): void {
    this.dashboardService.getListOfSales().subscribe((result) => {
      this.eventService.alertEvents.emit({ status: true });
      // Check if the result is an array, if not, convert it to an array
      const salesData = Array.isArray(result) ? result : [result];
      this.salesData = salesData;
      this.filteredSalesData = salesData;

      this.handlePanelsData();

      setTimeout(() => {
        this.eventService.alertEvents.emit({ status: false });
      }, 2000);
    });
  }

  ngOnInit(): void {
    // this.subjectService.setName(this.name);
    this.commonUtils.updateStoredData('name', this.name.toString());
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

  sortFilteredSalesData(column: string, isDescending: boolean): void {
    let dateA, dateB, productA, productB, nameA, nameB, locationA, locationB;

    this.filteredSalesData.sort((a: any, b: any) => {
      switch (column) {
        case 'id':
          return isDescending ? a.id - b.id : b.id - a.id;
        case 'date':
          dateA = new Date(a.createdAt);
          dateB = new Date(b.createdAt);

          return isDescending
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        case 'product':
          productA = a.productName.toLowerCase();
          productB = b.productName.toLowerCase();

          return isDescending
            ? productA.localeCompare(productB)
            : productB.localeCompare(productA);
        case 'customerName':
          nameA = a.customerName.toLowerCase();
          nameB = b.customerName.toLowerCase();

          return isDescending
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        case 'amount':
          return isDescending ? a.amount - b.amount : b.amount - a.amount;
        case 'location':
          locationA = a.location.toLowerCase();
          locationB = b.location.toLowerCase();

          return isDescending
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
        this.isIdDescending = !this.isIdDescending;
        this.sortFilteredSalesData('id', this.isIdDescending);
        break;
      case 'date':
        this.isDateDescending = !this.isDateDescending;
        this.sortFilteredSalesData('date', this.isDateDescending);
        break;
      case 'product':
        this.isProductDescending = !this.isProductDescending;
        this.sortFilteredSalesData('product', this.isProductDescending);
        break;
      case 'customerName':
        this.isCustomerNameDescending = !this.isCustomerNameDescending;
        this.sortFilteredSalesData(
          'customerName',
          this.isCustomerNameDescending
        );
        break;
      case 'amount':
        this.isAmountDescending = !this.isAmountDescending;
        this.sortFilteredSalesData('amount', this.isAmountDescending);
        break;
      case 'location':
        this.isLocationDescending = !this.isLocationDescending;
        this.sortFilteredSalesData('location', this.isLocationDescending);
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
    this.filteredSalesData = this.salesData;

    this.isIdDescending = false;
    this.isDateDescending = false;
    this.isCustomerNameDescending = false;
    this.isLocationDescending = false;
    this.isAmountDescending = false;

    this.isTodayTabClicked = false;
    this.isWeeklyTabClicked = false;
    this.isMonthlyTabClicked = false;
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
