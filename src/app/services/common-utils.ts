import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CommonUtils {
  updateStoredData(keyInput: string, valueInput: string): void {
    let storedData = JSON.parse(localStorage.getItem('storedData') ?? '[]');

    let found = false;
    storedData.forEach((obj: any) => {
      if (obj[keyInput] !== undefined) {
        obj[keyInput] = valueInput;
        found = true;
      }
    });

    if (!found) {
      storedData.push({ [keyInput]: valueInput });
    }

    localStorage.setItem('storedData', JSON.stringify(storedData));
  }

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