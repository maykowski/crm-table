import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {TableComponent} from "./table.component";
import {FormsModule} from "@angular/forms";
import {PopoverModule} from "ngx-popover";
import {DndModule} from "ng2-dnd";

@NgModule({
  imports:      [ BrowserModule, FormsModule, PopoverModule, DndModule.forRoot()],
  declarations: [ AppComponent, TableComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
