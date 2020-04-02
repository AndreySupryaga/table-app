import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { PaginateComponent } from './components/paginate/paginate.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PaginatePipe,
    PaginateComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
