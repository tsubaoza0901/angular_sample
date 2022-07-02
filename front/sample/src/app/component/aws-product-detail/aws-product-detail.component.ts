import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AwsProduct } from '../../model/aws-product';
import { AwsProductsService } from '../../service/aws-product.service';
import { MessageService } from 'src/app/service/message.service';

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
    // private messageService: MessageService, // ②の場合のみ必要
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAwsProduct();
  }

  // ① Component側でsubscribe()
  getAwsProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.awsProductsService
      .getAwsProduct(id)
      .subscribe((awsProduct: AwsProduct) => (this.awsProduct = awsProduct));
  }

  // // ② Component側でtoPromise()
  // async getAwsProduct() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   await this.awsProductsService
  //     .getAwsProduct(id)
  //     .toPromise()
  //     .then((awsProduct: any) => {
  //       this.awsProduct = awsProduct;
  //       this.messageService.add(
  //         `AwsProductService: fetched awsProduct id=${id}`
  //       );
  //     })
  //     .catch((error: any) => {
  //       // TODO: リモート上のロギング基盤にエラーを送信する
  //       console.error(error); // かわりにconsoleに出力

  //       // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
  //       const operation = 'getAwsProduct';
  //       this.messageService.add(`${operation} failed: ${error.message}`);
  //     });
  // }

  // // ③ Service側でtoPromise()
  // async getAwsProduct() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.awsProduct = await this.awsProductsService.getAwsProduct(id);
  // }

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
