import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TableDataComponent } from './table-data/table-data.component';
import { TableDataExcelComponent } from './table-data-excel/table-data-excel.component';


const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'table', component: TableDataComponent},
  {path: 'tableEx', component: TableDataExcelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
