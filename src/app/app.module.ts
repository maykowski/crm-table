import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {TableComponent} from "./table.component";
import {FormsModule} from "@angular/forms";
import {PopoverModule} from "ngx-popover";
import {DndModule} from "ng2-dnd";
import {MinPipe} from "./utils/min";
import {Hide} from "./utils/hide";
import {Ng2PaginationModule} from "ng2-pagination";

@NgModule({
  imports:      [ BrowserModule, FormsModule, PopoverModule, DndModule.forRoot(), Ng2PaginationModule],
  declarations: [ AppComponent, TableComponent, MinPipe, Hide],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
