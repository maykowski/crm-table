import {Component, Input} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {TableService} from "./table.service";
import {Location}                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {IMyOptions, IMyDateModel} from "mydatepicker";


@Component({
  moduleId: module.id,
  template:`
<a href="#" (click)="goBack()">back</a>

{{selectedRow.NAME}}

<ul>
<li *ngFor="let field of fields">
<div class="row field-row">
<div class="col-lg-3 text-right">
<label for="field_{{field}}" class="field-label">{{field}}</label>
</div>
<div class="col-lg-3">
<input type="text" *ngIf="!checkIfBoolean(selectedRow[field]) && !checkIfDatePicker(selectedRow[field])" [maxlength]="100" class="field-value"
id="field_{{field}}" [disabled]="field=='id'" [(ngModel)]="selectedRow[field]">
<input type="checkbox" *ngIf="checkIfBoolean(selectedRow[field])" id="field_{{field}}" [(ngModel)]="selectedRow[field]">
<my-date-picker *ngIf="checkIfDatePicker(selectedRow[field])" [(ngModel)]="selectedRow[field]" [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event)"></my-date-picker>

</div>
</div>
</li>
</ul>


`,

  styleUrls:['table-detail.component.css']



})

export class TableDetailComponent{
@Input()
  selectedRow:any = {};
  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd-mm-yyyy',
    showClearDateBtn: false,
    editableDateField:false,
    width:'50%',
    height:'30px'
  };

  private model: Object = { date: { year: 2018, month: 10, day: 9 } };

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.tableService.getTableDetail(+params['id']))
      .subscribe((row:any) => {
      this.selectedRow = row;
      this.fields = this.extractFieldNames(row);
        for (let field of this.fields) {
          if (this.checkIfDate(this.selectedRow[field])){
            let date = new Date(this.selectedRow[field]);
            this.selectedRow[field] = { date: { year: date.getFullYear(), month: date.getMonth(), day: date.getDay() } };
          }
        }
    });
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    // this.tableService.update(this.hero)
    //   .then(() => this.goBack());
  }


  fields:string[];




  constructor(private tableService: TableService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  onDateChanged(event: IMyDateModel) {
    console.log("onDateChanged", event);

  }

  extractFieldNames(item: any): string[] {
    return Object.keys(item);

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

  checkIfDatePicker(value: any): boolean {
    if (value.date) {
      return true;
    } else {
      return false;
    }
  }

  checkIfBoolean(value: any) {
    return typeof(value) === "boolean"
  }

}
