import { Component, OnInit } from '@angular/core';
import { AWS_PRODUCT } from '../../model/aws-product';
import { AwsProductsService } from '../../service/aws-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  awsProducts: AWS_PRODUCT[] = [];

  constructor(private awsProductsService: AwsProductsService) {}

  ngOnInit(): void {
    this.getAwsProducts();
  }

  getAwsProducts(): void {
    this.awsProductsService
      .getAwsProducts()
      .subscribe(
        (awsProducts: AWS_PRODUCT[]) =>
          (this.awsProducts = awsProducts.slice(1, 5))
      );
  }
}
