import { Component, OnInit } from '@angular/core';
import { AWS_PRODUCTS } from 'src/app/service/mock-data/mock-aws-products';
import { AwsProduct } from '../../model/aws-product';
import { AwsProductsService } from '../../service/aws-product.service';

@Component({
  selector: 'app-aws-products',
  templateUrl: './aws-products.component.html',
  styleUrls: ['./aws-products.component.scss'],
})
export class AwsProductsComponent implements OnInit {
  awsProducts: AwsProduct[] = [];

  constructor(private awsProductsService: AwsProductsService) {}

  ngOnInit(): void {
    this.getAwsProducts();
  }

  getAwsProducts(): void {
    this.awsProductsService
      .getAwsProducts()
      .subscribe(
        (awsProducts: AwsProduct[]) => (this.awsProducts = awsProducts)
      );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.awsProductsService
      .addAwsProduct({ name } as AwsProduct)
      .subscribe((awsProduct: AwsProduct) => {
        this.awsProducts.push(awsProduct);
      });
  }

  delete(awsProduct: AwsProduct): void {
    this.awsProducts = this.awsProducts.filter((a) => a !== awsProduct);
    this.awsProductsService.deleteAwsProduct(awsProduct.id).subscribe();
  }
}
