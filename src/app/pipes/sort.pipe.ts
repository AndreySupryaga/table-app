import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  private dateFormat = 'DD.MM.YYYY';

  transform(value: [], field: string, isSortReverse: boolean): any {
    const copy = [...value];
    copy.sort((a: any, b: any) => {
      const first = this.getDateMoment(a[field]).isValid() ?
        this.getDateMoment(a[field]).valueOf() :
        a[field];
      const second = this.getDateMoment(b[field]).isValid() ?
        this.getDateMoment(b[field]).valueOf() :
        b[field];
      if (first < second) {
        return -1;
      } else if (first > second) {
        return 1;
      } else {
        return 0;
      }
    });

    return isSortReverse ? copy.reverse() : copy;
  }

  private getDateMoment(date: string): moment.Moment {
    return moment(date, this.dateFormat);
  }
}
