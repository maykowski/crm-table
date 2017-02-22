import {Component, Input, EventEmitter, Output, OnInit} from "@angular/core";
import {Column} from "./Column";
import {DataTableParams} from "./types";

@Component({
  moduleId: module.id,
  selector: 'table-component',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css']
})
export class TableComponent implements OnInit {
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

  private _sortBy: string;
  private _sortAsc = true;

  @Input() pagination = true;
  @Input() itemCount: number;


  _reloading = false;
  _scheduledReload: number = null;
  @Output() reload = new EventEmitter();
  @Output() headerClick = new EventEmitter();

  _displayParams = <DataTableParams>{}; // params of the last finished reload
  @Input() autoReload = true;

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

  ngOnInit() {
    this._initDefaultClickEvents();
    this._displayParams = {
      sortBy: this.sortBy,
      sortAsc: this.sortAsc,
    };

    if (this.autoReload && this._scheduledReload == null) {
      this.reloadItems();
    }

    for (let sortCol of this.sortableColumns) {
      for (let col of this.columns) {
        if (col.name.toUpperCase() === sortCol.toUpperCase()) {
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
    return params;
  }

  toggleHighlightCol(i: number, hightlight: boolean): void {
    if (this.columns[i])
      this.columns[i]['hightlight'] = hightlight;
  }

  private _initDefaultClickEvents() {
    this.headerClick.subscribe((tableEvent: any) => this.sortColumn(tableEvent.column));
  }

  private sortColumn(column: Column) {
    if (column.sortable) {
      let ascending = (this.sortBy ? this.sortBy.toUpperCase() : "") === (column.property ? column.property.toUpperCase() : "") ? !this.sortAsc : true;
      this.sort(column.property, ascending);
    }
  }

  sort(sortBy: string, asc: boolean) {
    this.sortBy = sortBy;
    this.sortAsc = asc;
  }

  private headerClicked(column: Column, event: MouseEvent) {
    this.headerClick.emit({column, event});
  }

  checkIfDate(value: any): boolean {
    if (value == true || value == false) return false;
    let date = Date.parse(value);
    if (date) {
      return true;
    } else {
      return false;
    }
  }
}



