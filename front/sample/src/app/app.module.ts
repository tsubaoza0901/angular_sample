import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AwsProductsComponent } from './component/aws-products/aws-products.component';
import { AwsProductDetailComponent } from './component/aws-product-detail/aws-product-detail.component';
import { MessagesComponent } from './component/messages/messages.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AwsProductSearchComponent } from './component/aws-product-search/aws-product-search.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './service/in-memory-data.service'; // InMemoryではなく、外部APIを使用するためコメントアウト

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false,
    // }),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    AwsProductsComponent,
    AwsProductDetailComponent,
    MessagesComponent,
    AwsProductSearchComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
