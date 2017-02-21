import {Component, Pipe, PipeTransform, animate, transition, style, state, trigger, ElementRef, ChangeDetectorRef, Renderer, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Column} from "./Column";
import {PopoverModule, PopoverContent} from "ngx-popover";
import {DataTableParams} from "./types";
import {DataTableResource} from "./data-table-resource";

@Component({
  moduleId: module.id,
  selector: 'table-component',
  templateUrl: 'table.component.html',
  styles: [`

.column-btn{margin-left:100px;}

.highlight{background-color: #dedede;}

.table-panel{
margin: 20px 20px;
width:80%;
}



.nopadding {
   padding: 0 !important;
   margin: 0;
}
.column-list{list-style-type: none;     padding: 0px 0px;}
.column-item{cursor:move; padding: 8px 20px;}
.column-item:hover{background-color: #eee;}
.glyphicon-menu-hamburger{opacity: 0; color:#8e8e8e;}
.column-item:hover .glyphicon-menu-hamburger{opacity: 1;}
.column-name{margin-left:0;}
.inactivable{color:red; }

input[type=checkbox] {display:none; }
 
input[type=checkbox] + label{
height: 16px;
width: 16px;
display:inline-block;
padding: 0 0 0 0px;
margin-bottom: 0px;
background: url(svgicons.svg) no-repeat -79px -474px;
}
input[type=checkbox]:checked + label{
background: url(svgicons.svg) no-repeat -102px -474px;
}


`]
})
export class TableComponent implements OnInit{
  private _items: any[] = [];

  private _columns: Column[] = [];
  private _activableColumns: string[] = [];
  private _sortableColumns: string[] = [];
  @Input() get items() {
    return this._items;
  }

  set items(items: any[]) {
    this._items = items;
    //this._onReloadFinished();
  }

  @Input() get columns() {
    return this._columns;
  }

  set columns(columns: Column[]) {
    this._columns = columns;
    //this._onReloadFinished();
  }

  @Input() get activableColumns(): string[] {
    return this._activableColumns;
  }

  set activableColumns(value: string[]) {
    this._activableColumns = value;
  }

  @Input() get sortableColumns(): string[] {
    return this._sortableColumns;
  }

  set sortableColumns(value: string[]) {
    this._sortableColumns = value;
  }

  private _offset = 0;
  private _limit = 10;
  private _sortBy: string;
  private _sortAsc = true;

  @Input() pagination = true;
  @Input() itemCount: number;


  _reloading = false;
  _scheduledReload:number = null;
  @Output() reload = new EventEmitter();
  @Output() headerClick = new EventEmitter();

  _displayParams = <DataTableParams>{}; // params of the last finished reload
  @Input() autoReload = true;



  @Input()
  get offset() {
    return this._offset;
  }

  set offset(value) {
    this._offset = value;
    this._triggerReload();
  }

  @Input()
  get limit() {
    return this._limit;
  }

  set limit(value) {
    this._limit = value;
    this._triggerReload();
  }

  @Input()
  get sortBy() {
    return this._sortBy;
  }

  set sortBy(value) {
    this._sortBy = value;
    this._triggerReload();
  }

  @Input()
  get sortAsc() {
    return this._sortAsc;
  }

  set sortAsc(value) {
    this._sortAsc = value;
    this._triggerReload();
  }

  @Input()
  get page() {
    return Math.floor(this.offset / this.limit) + 1;
  }

  set page(value) {
    this.offset = (value - 1) * this.limit;
  }

  ngOnInit() {
    this._initDefaultClickEvents();
    this._displayParams = {
      sortBy: this.sortBy,
      sortAsc: this.sortAsc,
      offset: this.offset,
      limit: this.limit
    };

    if (this.autoReload && this._scheduledReload == null) {
      this.reloadItems();
    }

    for (let sortCol of this.sortableColumns) {
      for (let col of this.columns) {
        if (col.name === sortCol){
          col.sortable = true;
        }
      }
    }
  }

  _triggerReload() {
    if (this._scheduledReload) {
      clearTimeout(this._scheduledReload);
    }
    this._scheduledReload = setTimeout(() => {
      this.reloadItems();
    });
  }

  reloadItems() {
    this._reloading = true;
    this.reload.emit(this._getRemoteParameters());
  }



  private _getRemoteParameters(): DataTableParams {
    let params = <DataTableParams>{};

    if (this.sortBy) {
      params.sortBy = this.sortBy;
      params.sortAsc = this.sortAsc;
    }
    if (this.pagination) {
      params.offset = this.offset;
      params.limit = this.limit;
    }
    return params;
  }

  toggleHighlightCol(i:number, hightlight:boolean):void{
    // console.log("toggleHighlightCol")
    if(this.columns[i])
      this.columns[i]['hightlight']=hightlight;
  }

  private _initDefaultClickEvents() {
    this.headerClick.subscribe((tableEvent:any) => this.sortColumn(tableEvent.column));
    // if (this.selectOnRowClick) {
    //   this.rowClick.subscribe(tableEvent => tableEvent.row.selected = !tableEvent.row.selected);
    // }
  }

  private sortColumn(column: Column) {
    //if (column.sortable) {
      let ascending = this.sortBy === column.property ? !this.sortAsc : true;
      this.sort(column.property, ascending);
    //}
  }

  sort(sortBy: string, asc: boolean) {
    this.sortBy = sortBy;
    this.sortAsc = asc;
  }

  private headerClicked(column: Column, event: MouseEvent) {
      this.headerClick.emit({ column, event });
  }

  // cleanHighlightCol(i:number):void{
  //   console.log("cleanHighlightCol")
  //   if(this.columns[i])
  //     this.columns[i]['hightlight']=false;
  // }

  // toggleColumn(): void {
  //
  //   let tempCol:Column[] = [];
  //   for (let col of this.columns) {
  //     tempCol.push(col);
  //   }
  //   this.columns = tempCol;
  //   console.log("toggleColumn")
  //
  // }


}



