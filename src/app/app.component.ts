import {Component} from "@angular/core";
import {DataTableResource} from "./data-table-resource";
import {DataTableParams} from "./types";
import {Column} from "./Column";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<table-component (reload)="reloadItems($event)"         [items]="rows" [columns]="columns"
[activableColumns]="activableColumns"         [itemCount]="itemCount" [sortableColumns]="sortableColumns"

></table-component>`,
})
export class AppComponent {
  name = 'Angular';

  rows: Array < any > = [

    {"NAME": "Aaron 2Moore", "EMAIL": "Heath44@hotmail.com", "JOB TITLE": "Regional Configuration Producer", "ACTIVE": true, "PHONE NUMBER": "611-898-6201", "DATE": "2015-11-06T07:21:25.510Z"},
    {"NAME": "Yvonne Conroy Mrs.", "EMAIL": "Gideon9@yahoo.com", "JOB TITLE": "Global Mobility Orchestrator", "ACTIVE": false, "PHONE NUMBER": "115-850-0969", "DATE": "2014-12-20T00:48:40.276Z"},
    {"NAME": "Laron Padberg", "EMAIL": "Laney_Huels@hotmail.com", "JOB TITLE": "Senior Directives Supervisor", "ACTIVE": false, "PHONE NUMBER": "632-654-3034", "DATE": "2015-09-29T04:33:38.544Z"},
    {"NAME": "Dr. Maryam Spinka", "EMAIL": "Aletha.Labadie@hotmail.com", "JOB TITLE": "Dynamic Mobility Associate", "ACTIVE": true, "PHONE NUMBER": "547-345-0067", "DATE": "2015-09-23T01:13:39.320Z"},
    {"NAME": "Kiley Baumbach", "EMAIL": "Rogelio24@hotmail.com", "JOB TITLE": "Principal Metrics Orchestrator", "ACTIVE": true, "PHONE NUMBER": "958-524-5164", "DATE": "2014-12-05T23:39:27.340Z"},
    {"NAME": "Hollis MacGyver", "EMAIL": "Yazmin.Heidenreich97@gmail.com", "JOB TITLE": "Direct Markets Assistant", "ACTIVE": true, "PHONE NUMBER": "603-607-3241", "DATE": "2015-02-12T10:40:52.977Z"},
    {"NAME": "Axel McLaughlin", "EMAIL": "Deon_Heaney@gmail.com", "JOB TITLE": "Forward Mobility Architect", "ACTIVE": false, "PHONE NUMBER": "983-639-0705", "DATE": "2015-06-10T17:42:38.644Z"},
    {"NAME": "Ricardo Botsford", "EMAIL": "Melisa73@yahoo.com", "JOB TITLE": "Direct Quality Consultant", "ACTIVE": true, "PHONE NUMBER": "408-082-9480", "DATE": "2015-01-31T03:41:54.611Z"},
    {
      "NAME": "Corbin Funk Mrs.",
      "EMAIL": "Marjory.Morissette51@gmail.com",
      "JOB TITLE": "Human Configuration Manager",
      "ACTIVE": true,
      "PHONE NUMBER": "386-937-8683",
      "DATE": "2014-12-05T15:07:36.843Z"
    },
    {"NAME": "Rosalind Paucek", "EMAIL": "Ivy_Stanton@gmail.com", "JOB TITLE": "Future Creative Supervisor", "ACTIVE": true, "PHONE NUMBER": "977-661-7403", "DATE": "2015-06-10T17:42:38.644Z"},
    {
      "NAME": "Henderson Moore",
      "EMAIL": "Randi_Corkery@hotmail.com",
      "JOB TITLE": "Internal Accountability Director",
      "ACTIVE": true,
      "PHONE NUMBER": "078-101-6377",
      "DATE": "2015-09-26T05:14:34.913Z"
    },
    {"NAME": "Kelli Schoen", "EMAIL": "Reva.Kiehn54@yahoo.com", "JOB TITLE": "National Accountability Architect", "ACTIVE": false, "PHONE NUMBER": "654-591-6561", "DATE": "2015-05-04T06:50:37.482Z"},
    {"NAME": "Kenna Fritsch", "EMAIL": "Wilburn2@gmail.com", "JOB TITLE": "Legacy Response Administrator", "ACTIVE": true, "PHONE NUMBER": "790-480-2859", "DATE": "2015-10-10T23:37:05.611Z"},
    {"NAME": "Judge Marquardt", "EMAIL": "Letha_Champlin69@hotmail.com", "JOB TITLE": "Human Program Specialist", "ACTIVE": true, "PHONE NUMBER": "100-494-1787", "DATE": "2015-04-04T23:29:48.588Z"},
    {
      "NAME": "Kurtis Hane",
      "EMAIL": "Mona.Gaylord47@yahoo.com",
      "JOB TITLE": "International Optimization Director",
      "ACTIVE": false,
      "PHONE NUMBER": "008-800-2959",
      "DATE": "2014-12-04T21:09:50.722Z"
    },
    {"NAME": "Nicolette Lind", "EMAIL": "Thurman30@yahoo.com", "JOB TITLE": "Legacy Marketing Facilitator", "ACTIVE": true, "PHONE NUMBER": "007-908-2460", "DATE": "2015-06-22T08:11:57.381Z"},
    {"NAME": "Idella Green", "EMAIL": "Fernando_Ward@yahoo.com", "JOB TITLE": "Dynamic Division Orchestrator", "ACTIVE": false, "PHONE NUMBER": "147-865-1578", "DATE": "2015-02-12T23:00:31.283Z"},
    {"NAME": "Mackenzie Bartell", "EMAIL": "Price25@yahoo.com", "JOB TITLE": "National Directives Associate", "ACTIVE": false, "PHONE NUMBER": "235-649-0980", "DATE": "2015-06-24T20:21:51.356Z"},
    {"NAME": "Mose Kohler", "EMAIL": "Malika56@hotmail.com", "JOB TITLE": "Lead Implementation Executive", "ACTIVE": true, "PHONE NUMBER": "614-886-4868", "DATE": "2015-03-04T13:05:23.698Z"},
    {"NAME": "Cielo Kuphal", "EMAIL": "Jude_Terry24@gmail.com", "JOB TITLE": "Dynamic Division Analyst", "ACTIVE": false, "PHONE NUMBER": "590-976-7492", "DATE": "2015-06-02T20:52:32.664Z"},
    {"NAME": "Haleigh Stokes", "EMAIL": "Belle_Herman64@yahoo.com", "JOB TITLE": "Global Intranet Executive", "ACTIVE": false, "PHONE NUMBER": "418-255-9365", "DATE": "2015-04-10T00:32:10.283Z"},
    {"NAME": "Tyrese Walter", "EMAIL": "Garland.Veum52@hotmail.com", "JOB TITLE": "Senior Web Liason", "ACTIVE": false, "PHONE NUMBER": "041-555-9831", "DATE": "2015-08-18T20:05:08.839Z"},
    {"NAME": "Barney Shields", "EMAIL": "Anika27@gmail.com", "JOB TITLE": "District Web Administrator", "ACTIVE": true, "PHONE NUMBER": "379-438-0217", "DATE": "2015-06-01T09:28:46.778Z"},
    {
      "NAME": "Favian Abbott Miss",
      "EMAIL": "Palma_Little@hotmail.com",
      "JOB TITLE": "Lead Implementation Facilitator",
      "ACTIVE": false,
      "PHONE NUMBER": "642-808-5400",
      "DATE": "2015-08-09T07:38:06.588Z"
    },
    {"NAME": "Carissa Kunze", "EMAIL": "Merl_Frami@yahoo.com", "JOB TITLE": "Regional Division Technician", "ACTIVE": true, "PHONE NUMBER": "949-983-0342", "DATE": "2015-11-05T08:09:09.463Z"}
  ]
  columns: Column[];
  activableColumns: string[] = ['name'];
  sortableColumns: string[] = ['name', 'job title', "ACTIVE", "DATE"];
  itemCount = 0;


  itemResource = new DataTableResource(this.rows);

  constructor() {
    this.itemResource.count().then(count => this.itemCount = count);
    this.columns = this.extractColumns();
    this.prepareProprty();
  }

  prepareProprty() {
    for (let col of this.columns) {
      col.property = col.name.replace(" ", "")
    }
  }

  reloadItems(params: DataTableParams) {
    this.itemResource.query(params).then(items => this.rows = items);
  }

  extractColumns(): Column[] {
    let columnsKeys = Object.keys(this.rows[0]);
    let columns: Column[] = [];
    for (let col of columnsKeys) {
      let activable = true;
      for (let activableColumns of this.activableColumns) {
        if (activableColumns.toUpperCase() === col.toUpperCase()) {
          activable = false;
        }
        columns.push({name: col, active: true, activable: activable, sortable: undefined, property: undefined});
      }
    }
    console.log(columns);
    return columns;
  }

}
