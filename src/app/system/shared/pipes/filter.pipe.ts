import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'appFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter(i => {
      const t = Object.assign({}, i);

      if (!isNaN(t[field])) {
        t[field] += '';
      }

      if (field === 'type') {
        t[field] = t[field] === 'income' ? 'доход' : 'расход';
      }

      if (field === 'category') {
        t[field] = t['catName'];
      }

      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
