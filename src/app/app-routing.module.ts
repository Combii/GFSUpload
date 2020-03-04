import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TableDataChartGfsComponent } from './table-data-chart-gfs/table-data-chart-gfs.component';
import { TableDataAccountComponent } from './table-data-account/table-data-account.component';


const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'tableChartGFS', component: TableDataChartGfsComponent},
  {path: 'tableAccount', component: TableDataAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
