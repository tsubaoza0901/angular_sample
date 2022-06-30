import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AwsProduct } from '../model/aws-product';
import { MessageService } from './message.service';
import { AWS_PRODUCTS } from './mock-data/mock-aws-products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AwsProductsService {
  private awsProductsUrl = 'api/awsProducts'; // Web APIのURL ※'api/xxx'のxxxの部分は、InMemoryDataServiceのcreateDbで返却されるプロパティ名と一致する必要がある点に注意
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAwsProducts(): Observable<AwsProduct[]> {
    return this.http.get<AwsProduct[]>(this.awsProductsUrl).pipe(
      tap((awsProducts) => this.log('fetched awsProducts')),
      catchError(this.handleError<AwsProduct[]>('getAwsProducts', []))
    );
  }

  getAwsProduct(id: number): Observable<AwsProduct> {
    const url = `${this.awsProductsUrl}/${id}`;
    return this.http.get<AwsProduct>(url).pipe(
      tap((_) => this.log(`fetched awsProduct id=${id}`)),
      catchError(this.handleError<AwsProduct>(`getAwsProduct id=${id}`))
    );
  }

  updateAwsProduct(awsProduct: AwsProduct): Observable<any> {
    return this.http
      .put(this.awsProductsUrl, awsProduct, this.httpOptions)
      .pipe(
        tap((_) => this.log(`updated awsProduct id=${awsProduct.id}`)),
        catchError(this.handleError<any>(`updateAwsProduct`))
      );
  }

  addAwsProduct(awsProduct: AwsProduct): Observable<AwsProduct> {
    return this.http
      .post<AwsProduct>(this.awsProductsUrl, awsProduct, this.httpOptions)
      .pipe(
        tap((newAwsProduct: AwsProduct) =>
          this.log(`added awsProduct w/ id=${newAwsProduct.id}`)
        ),
        catchError(this.handleError<AwsProduct>('addAwsProduct'))
      );
  }

  deleteAwsProduct(id: number): Observable<AwsProduct> {
    const url = `${this.awsProductsUrl}/${id}`;

    return this.http.delete<AwsProduct>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted awsProduct id=${id}`)),
      catchError(this.handleError<AwsProduct>('deleteAwsProduct'))
    );
  }

  searchAwsProducts(term: string): Observable<AwsProduct[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<AwsProduct[]>(`${this.awsProductsUrl}/?name=${term}`)
      .pipe(
        tap((_) => this.log(`found awsProducts matching "${term}"`)),
        catchError(this.handleError<AwsProduct[]>('searchAwsProducts', []))
      );
  }

  /** HeroServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`AwsProductService: ${message}`);
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   *
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}
