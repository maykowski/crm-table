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
import {InMemoryDataService} from "./in-memory-data.service";
import {TableService} from "./table.service";
import {AppRoutingModule} from "./app-routing.module";
import {TableDetailComponent} from "./table-detail.component";
import {HttpModule} from "@angular/http";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {DemoComponent} from "./demo.component";
import {MyDatePickerModule} from "mydatepicker";

@NgModule({
  imports:      [ BrowserModule, FormsModule, PopoverModule, DndModule.forRoot(), Ng2PaginationModule, HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService), AppRoutingModule, MyDatePickerModule
  ],
  declarations: [ AppComponent, DemoComponent, TableComponent, TableDetailComponent, MinPipe, Hide],
  bootstrap:    [ AppComponent ],
  providers: [TableService]
})
export class AppModule { }
