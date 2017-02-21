import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {TableComponent} from "./table.component";
import {FormsModule} from "@angular/forms";
import {PopoverModule} from "ngx-popover";
import {DndModule} from "ng2-dnd";
import {DataTablePagination} from "./footer/pagination.component";
import {MinPipe} from "./utils/min";
import {Hide} from "./utils/hide";

@NgModule({
  imports:      [ BrowserModule, FormsModule, PopoverModule, DndModule.forRoot()],
  declarations: [ AppComponent, TableComponent, DataTablePagination, MinPipe, Hide],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
