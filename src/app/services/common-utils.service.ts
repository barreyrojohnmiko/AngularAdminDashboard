import { Injectable } from '@angular/core';

import * as moment from 'moment'

@Injectable({
  providedIn: 'root',
})
export class CommonUtilsService {
  formatAmount(input: number) {
    let formattedAmount = input.toString();

    formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const parts = formattedAmount.split('.');

    if (parts.length > 1) {
      parts[1] = parts[1].substring(0, 2);
    } else {
      parts.push('00');
    }

    return parts.join('.');
  }

  formatDateMDY(date: string) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = moment(date, userTimeZone);
    return localDate.format('MMM. DD, YYYY');
  }
}
