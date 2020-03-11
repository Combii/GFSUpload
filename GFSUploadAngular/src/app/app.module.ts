import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TableDataChartGfsComponent } from './table-data-chart-gfs/table-data-chart-gfs.component';
import { TableDataAccountComponent } from './table-data-account/table-data-account.component';
import { HeaderComponent } from './header/header.component';
import { ErrorNotificationDirective } from './error-notification.directive';
import { TableDataCellComponent } from './table-data-cell/table-data-cell.component';
import { HttpClientModule } from '@angular/common/http';

import { TooltipModule } from 'ng2-tooltip-directive';
import { AuthComponent } from './auth/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    TableDataChartGfsComponent,
    MenuComponent,
    TableDataAccountComponent,
    HeaderComponent,
    ErrorNotificationDirective,
    TableDataCellComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
