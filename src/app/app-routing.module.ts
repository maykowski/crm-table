import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableDetailComponent} from "./table-detail.component";
import {TableComponent} from "./table.component";
const routes: Routes = [
  // {path: '', redirectTo: '/table', pathMatch: 'full'},
  {path: 'table', component: TableComponent},
  {path: 'detail/:id', component: TableDetailComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
