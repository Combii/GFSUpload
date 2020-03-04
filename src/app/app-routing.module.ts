import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TableDataChartGfsComponent } from './table-data-chart-gfs/table-data-chart-gfs.component';
import { TableDataExcelComponent } from './table-data-excel/table-data-excel.component';


const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'tableChartGFS', component: TableDataChartGfsComponent},
  {path: 'tableEx', component: TableDataExcelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
