import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AwsProduct } from '../../model/aws-product';
import { AwsProductsService } from '../../service/aws-product.service';

@Component({
  selector: 'app-aws-product-detail',
  templateUrl: './aws-product-detail.component.html',
  styleUrls: ['./aws-product-detail.component.scss'],
})
export class AwsProductDetailComponent implements OnInit {
  awsProduct: AwsProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private awsProductsService: AwsProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAwsProduct();
  }

  getAwsProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.awsProductsService
      .getAwsProduct(id)
      .subscribe((awsProduct: AwsProduct) => (this.awsProduct = awsProduct));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.awsProduct) {
      this.awsProductsService
        .updateAwsProduct(this.awsProduct)
        .subscribe(() => this.goBack());
    }
  }
}
