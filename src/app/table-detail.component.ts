import {Component, Input} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {TableService} from "./table.service";
import {Location}                 from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  template:`{{selectedRow.NAME}}`

})

export class TableDetailComponent{
@Input()
  selectedRow:any = {};

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.tableService.getTableDetail(+params['id']))
      .subscribe((row:any) => this.selectedRow = row);
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    // this.tableService.update(this.hero)
    //   .then(() => this.goBack());
  }




  constructor(private tableService: TableService,
              private route: ActivatedRoute,
              private location: Location) {
  }

}
