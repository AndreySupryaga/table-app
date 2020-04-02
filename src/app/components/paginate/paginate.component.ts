import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IPaginateOptions } from '@app/interfaces';

const defaultPaginateOptions = {
  currentPage: 0,
  pageSize: 5,
};

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit, OnChanges {
  public paginateOptions: IPaginateOptions = {...defaultPaginateOptions};

  @Input()
  public itemLength: number;
  @Output()
  public paginateOptionsEmit: EventEmitter<IPaginateOptions> = new EventEmitter<IPaginateOptions>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.paginateOptions = {...defaultPaginateOptions};
  }

  ngOnInit() {
    this.paginateOptionsEmit.emit(this.paginateOptions);
  }

  public getArrayForPaginate(): number[] {
    if (this.itemLength) {
      const amountOfPages = Math.ceil(this.itemLength / this.paginateOptions.pageSize);
      return Array.from(Array(amountOfPages).keys());
    }
    return [];
  }

  public setCurrentPage(pageNumber: number) {
    this.paginateOptions.currentPage = pageNumber;
    this.paginateOptionsEmit.emit(this.paginateOptions);
  }

  public setPageSize(pageSize: number) {
    this.paginateOptions.pageSize = pageSize;
    this.paginateOptionsEmit.emit(this.paginateOptions);
  }

}
