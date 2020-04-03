import { Component, OnInit } from '@angular/core';
import * as dataFromJson from './data.json';
import { IMovie, IPaginateOptions, ITableColumnOptions } from '@app/interfaces';
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
  private sortField: string;
  private isSortReverse: boolean;
  public searchValue: string;
  public genres: string[];
  public selectedGenre = '';
  public premiereYears: number[];
  public selectedYear = '';
  public paginateOptions: IPaginateOptions = {
    currentPage: 0,
    pageSize: 5,
  };
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
    this.paginateOptions = {
      currentPage: 0,
      pageSize: 5,
    };
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

  public sortDataBy(field: string) {
    if (this.sortField === field) {
      this.isSortReverse = !this.isSortReverse;
      return;
    }
    this.sortField = field;
    this.isSortReverse = false;
  }

  public setPaginateOptions(paginateOptions) {
    this.paginateOptions = paginateOptions;
  }

  private getDateMoment(date: string): moment.Moment {
    return moment(date, this.dateFormat);
  }

  public getHeadThClass(field: string) {
    if (field === this.sortField) {
      return `sort ${this.isSortReverse ? 'desk' : 'ask'}`;
    }
    return '';
  }

  private copyArr(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

}
