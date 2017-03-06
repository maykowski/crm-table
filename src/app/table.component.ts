import {Component, Input, EventEmitter, Output, OnInit} from "@angular/core";
import {Column} from "./Column";
import {DataTableParams} from "./types";
import {DataTableResource} from "./data-table-resource";

@Component({
  moduleId: module.id,
  selector: 'table-component',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css']
})
export class TableComponent implements OnInit {

  private items: any[];
  private _itemsPromise: Promise<any[]>;

  private _columns: Column[] = [];
  private _activableColumns: string[] = [];
  private _sortableColumns: string[] = [];

  @Input() get itemsPromise() {
    return this._itemsPromise;
  }

  set itemsPromise(itemsPromise: Promise<any[]>) {
    this._itemsPromise = itemsPromise;
    //this._onReloadFinished();
  }

  get columns() {
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
  // @Output() reload = new EventEmitter();
  @Output() headerClick = new EventEmitter();
  @Output() multiSelect = new EventEmitter();

  selectedItems: any[] = [];

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

  dataTableResouce: DataTableResource<any>;

  ngOnInit() {
    this.itemsPromise.then(items => {
      this.columns = this.extractColumns(items, this.activableColumns);
      this.items = items;

      for (let col of this.columns) {
        col.property = col.name;//.replace(" ", "")
      }
      this._initDefaultClickEvents();

      for (let sortCol of this.sortableColumns) {
        for (let col of this.columns) {
          if (col.name.toUpperCase() === sortCol.toUpperCase()) {
            col.sortable = true;
          }
        }
      }

      this.dataTableResouce = new DataTableResource(this.items);
      return this.dataTableResouce.query(this._getRemoteParameters())

    }).then(queryItems => {
      this.items = queryItems;
    });

    this._displayParams = {
      sortBy: this.sortBy,
      sortAsc: this.sortAsc,
    };
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
    new DataTableResource(this.items).query(this._getRemoteParameters()).then(items => {
      this.items = items;
    });
  }


  private _getRemoteParameters(): DataTableParams {
    let params = <DataTableParams>{};

    if (this.sortBy) {
      params.sortBy = this.sortBy;
      params.sortAsc = this.sortAsc;
    }


    // params.limit = 10;
    // params.offset = 0;
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
    if (!isNaN(date) && isNaN(value)) {
      return true;
    } else {
      return false;
    }
  }

  checkIfBoolean(value: any) {
    return typeof(value) === "boolean"
  }

  // extracting columns from array and mark activable columns
  extractColumns(items: any[], activableColumns: string[]): Column[] {
    let columnsKeys = Object.keys(items[0]);
    let columns: Column[] = [];
    for (let col of columnsKeys) {
      let activable = true;
      for (let activableColumn of activableColumns) {
        if (activableColumn.toUpperCase() === col.toUpperCase()) {
          activable = false;
        }
        columns.push({name: col, active: true, activable: activable, sortable: undefined, property: undefined});
      }
    }
    return columns;
  }

  manageSelection(item: any) {
    if (item.selected) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1)
    }
    this.multiSelect.emit(this.selectedItems);

  }

  selectAll: boolean;

  toggleAll() {
    if (this.selectAll) {
      for (let item of this.items)
        item.selected = true;
      this.selectedItems = this.items.slice(0)
    } else {
      for (let item of this.items)
        item.selected = false;
      this.selectedItems = []
    }
    this.multiSelect.emit(this.selectedItems);


  }
}



