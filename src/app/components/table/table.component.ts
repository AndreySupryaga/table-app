import { Component, OnInit } from '@angular/core';
import * as data from './data.json';
import { IMovie } from '@app/interfaces/movie.interface';
import moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public movies: IMovie[];
  private lastFilteredField: string;

  constructor() {
  }

  ngOnInit() {
    this.movies = data['default'];
  }

  public sortDataBy(field: string) {
    if (this.lastFilteredField === field) {
      this.movies = this.movies.reverse();
      return;
    }
    this.movies.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.lastFilteredField = field;
  }

  public sortByDate() {
    if (this.lastFilteredField === 'premiere') {
      this.movies = this.movies.reverse();
      return;
    }
    this.movies.sort((a: any, b: any) => {
      if (moment(a.premiere, 'DD.MM.YYYY').valueOf() < moment(b.premiere, 'DD.MM.YYYY').valueOf()) {
        return -1;
      } else if (moment(a.premiere, 'DD.MM.YYYY').valueOf() > moment(b.premiere, 'DD.MM.YYYY').valueOf()) {
        return 1;
      } else {
        return 0;
      }
    });
    this.lastFilteredField = 'premiere';
  }
}
