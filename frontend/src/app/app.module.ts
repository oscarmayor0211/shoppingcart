import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { AppRoutingModule } from './app-routing.module';
import { ProductCategorrMenuComponent } from './components/product-categorr-menu/product-categorr-menu.component';
import { SearchComponent } from './components/search/search.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategorrMenuComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
