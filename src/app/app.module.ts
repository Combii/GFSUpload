import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableDataComponent } from './table-data/table-data.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TableDataComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
