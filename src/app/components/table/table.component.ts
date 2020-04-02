import { Component, OnInit } from '@angular/core';
import * as dataFromJson from './data.json';
import { IMovie, ITableColumnOptions } from '@app/interfaces';
import moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  private dateFormat = 'DD.MM.YYYY';
  public viewMovies: IMovie[];
  public originMovies: IMovie[];
  private lastFilteredField: string;
  private sortDeskOrAsk: string;
  public searchValue: string;
  public genres: string[];
  public selectedGenre = '';
  public premiereYears: number[];
  public selectedYear = '';

  public columnOptions: ITableColumnOptions[] = [
    {name: 'Name', field: 'name', className: 'text-left'},
    {name: 'Season', field: 'season'},
    {name: 'Network', field: 'network'},
    {name: 'Premiere', field: 'premiere', className: 'text-right'},
  ];

  constructor() {
  }

  ngOnInit() {
    const movies = dataFromJson['default'];
    this.originMovies = movies;
    this.viewMovies = movies;
    this.genres = this.getGenres(movies);
    this.premiereYears = this.getPremiereYears(movies);
  }

  private getPremiereYears(movies: IMovie[]) {
    const premiereYears: number[] = [];
    movies.forEach((movie) => {
      const year = this.getDateMoment(movie.premiere).year();
      if (!premiereYears.includes(year)) {
        premiereYears.push(year);
      }
    });
    return premiereYears.sort();
  }

  private getGenres(movies: IMovie[]) {
    const genres: string[] = [];
    movies.forEach((movie) => {
      movie.genre.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
    });
    return genres;
  }

  public filterMovies() {
    let movies = this.copyArr(this.originMovies);
    if (this.selectedGenre) {
      movies = movies.filter(movie => {
        return movie.genre.includes(this.selectedGenre);
      });
    }
    if (this.selectedYear) {
      movies = movies.filter(movie => {
        return movie.premiere.includes(this.selectedYear);
      });
    }
    if (this.searchValue) {
      movies = movies.filter(movie => {
        return movie.name.toLowerCase().includes(this.searchValue.toLowerCase());
      });
    }
    this.viewMovies = movies;
  }

  private copyArr(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  public sortDataBy(field: string) {
    if (this.lastFilteredField === field) {
      this.viewMovies = this.viewMovies.reverse();
      this.sortDeskOrAsk = this.sortDeskOrAsk === 'ask' ? 'desk' : 'ask';
      return;
    }
    this.viewMovies.sort((a: any, b: any) => {
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
    this.lastFilteredField = field;
    this.sortDeskOrAsk = 'ask';
  }

  private getDateMoment(date: string): moment.Moment {
    return moment(date, this.dateFormat);
  }

  public getHeadThClass(field: string) {
    if (field === this.lastFilteredField) {
      return `sort ${this.sortDeskOrAsk}`;
    }
    return '';
  }
}
