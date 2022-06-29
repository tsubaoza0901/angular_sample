import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AwsProductDetailComponent } from './component/aws-product-detail/aws-product-detail.component';
import { AwsProductsComponent } from './component/aws-products/aws-products.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: AwsProductDetailComponent },
  { path: 'aws-products', component: AwsProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
