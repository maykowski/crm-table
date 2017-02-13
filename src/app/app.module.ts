import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {TableComponent} from "./table.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, TableComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
