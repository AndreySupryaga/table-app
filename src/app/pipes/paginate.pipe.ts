import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
  transform(value: any, current: number, size): any {
    return value.slice(current * size, (current * size) + size + 1);
  }
}
