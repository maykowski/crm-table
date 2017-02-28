import {Component, OnInit} from "@angular/core";
import {DataTableResource} from "./data-table-resource";
import {DataTableParams} from "./types";
import {Column} from "./Column";
import {TableService} from "./table.service";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<table-component (reload)="reloadItems($event)"         [itemsPromise]="rowsPromise" (multiSelect)="getSelected($event)"
[activableColumns]="activableColumns"         [itemCount]="itemCount" [sortableColumns]="sortableColumns"

></table-component>
<router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit{
  name = 'Angular';
  rows: Array < any > = [];
  rowsPromise:Promise<any[]>;

  activableColumns: string[] = ['name'];
  sortableColumns: string[] = ['name', 'job title', "DATE"];
  itemCount = 0;



  itemResource:DataTableResource<any>;

  constructor(private tableService:TableService) {
    // this.itemResource.count().then(count => this.itemCount = count);
  }


  ngOnInit(): void {
    this.tableService.getTable().then(items=>  this.itemResource = new DataTableResource(items));
    this.rowsPromise = this.tableService.getTable();
  }


  getSelected(items:any[]){
    console.log("gs",items);
  }



}
