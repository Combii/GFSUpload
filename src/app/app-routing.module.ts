import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TableDataComponent } from './table-data/table-data.component';


const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'table', component: TableDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
