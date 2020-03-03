import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableDataComponent } from './table-data/table-data.component';
import { MenuComponent } from './menu/menu.component';
import { TableDataExcelComponent } from './table-data-excel/table-data-excel.component';
import { HeaderComponent } from './header/header.component';
import { ErrorNotificationDirective } from './error-notification.directive';
import { TableDataCellComponent } from './table-data-cell/table-data-cell.component';

import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    AppComponent,
    TableDataComponent,
    MenuComponent,
    TableDataExcelComponent,
    HeaderComponent,
    ErrorNotificationDirective,
    TableDataCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
