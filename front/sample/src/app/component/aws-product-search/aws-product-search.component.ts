import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { AWS_PRODUCT } from '../../model/aws-product';
import { AwsProductsService } from '../../service/aws-product.service';

@Component({
  selector: 'app-aws-product-search',
  templateUrl: './aws-product-search.component.html',
  styleUrls: ['./aws-product-search.component.css'],
})
export class AwsProductSearchComponent implements OnInit {
  awsProducts$!: Observable<AWS_PRODUCT[]>;
  private searchTerms = new Subject<string>();

  constructor(private awsProductsService: AwsProductsService) {}

  // 検索語をobservableストリームにpushする
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.awsProducts$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待つ
      debounceTime(300),

      // 直前の検索語と同じ場合は無視する
      distinctUntilChanged(),

      // 検索語が変わる度に、新しい検索observableにスイッチする
      switchMap((term: string) =>
        this.awsProductsService.searchAwsProducts(term)
      )
    );
  }
}
