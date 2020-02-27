import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableDataComponent } from './table-data/table-data.component';
import { MenuComponent } from './menu/menu.component';
import { TableDataExcelComponent } from './table-data-excel/table-data-excel.component';
import { HeaderComponent } from './header/header.component';
import { ErrorNotificationDirective } from './error-notification.directive';

@NgModule({
  declarations: [
    AppComponent,
    TableDataComponent,
    MenuComponent,
    TableDataExcelComponent,
    HeaderComponent,
    ErrorNotificationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
