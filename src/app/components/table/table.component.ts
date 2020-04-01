import { Component, OnInit } from '@angular/core';
import * as data from './data.json';
import { IMovie, ITableColumnOptions } from '@app/interfaces';
import moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public movies: IMovie[];
  private lastFilteredField: string;
  private sortDeskOrAsk: string;
  public columnOptions: ITableColumnOptions[] = [
    {name: 'Name', field: 'name', className : 'text-left'},
    {name: 'Season', field: 'season'},
    {name: 'Network', field: 'network'},
    {name: 'Premiere', field: 'premiere', className : 'text-right'},
  ];

  constructor() {
  }

  ngOnInit() {
    this.movies = data['default'];
  }

  public sortDataBy(field: string) {
    if (this.lastFilteredField === field) {
      this.movies = this.movies.reverse();
      this.sortDeskOrAsk = this.sortDeskOrAsk === 'ask' ? 'desk' : 'ask';
      return;
    }
    this.movies.sort((a: any, b: any) => {
      const first = moment(a[field], 'DD.MM.YYYY').isValid() ?
        moment(a[field], 'DD.MM.YYYY').valueOf() :
        a[field];
      const second = moment(b[field], 'DD.MM.YYYY').isValid() ?
        moment(b[field], 'DD.MM.YYYY').valueOf() :
        b[field];
      if (first < second) {
        return -1;
      } else if (first > second) {
        return 1;
      } else {
        return 0;
      }
    });
    this.lastFilteredField = field;
    this.sortDeskOrAsk = 'ask';

  }

  public getHeadThClass(field: string) {
    if (field === this.lastFilteredField) {
      return `sort ${this.sortDeskOrAsk}`;
    }
    return '';
  }
}
