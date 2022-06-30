import { Component, OnInit } from '@angular/core';
import { AwsProduct } from '../../model/aws-product';
import { AwsProductsService } from '../../service/aws-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  awsProducts: AwsProduct[] = [];

  constructor(private awsProductsService: AwsProductsService) {}

  ngOnInit(): void {
    this.getAwsProducts();
  }

  getAwsProducts(): void {
    this.awsProductsService
      .getAwsProducts()
      .subscribe(
        (awsProducts: AwsProduct[]) =>
          (this.awsProducts = awsProducts.slice(1, 5))
      );
  }
}
