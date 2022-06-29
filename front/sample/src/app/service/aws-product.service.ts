import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AWS_PRODUCT } from '../model/aws-product';
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

  getAwsProducts(): Observable<AWS_PRODUCT[]> {
    return this.http.get<AWS_PRODUCT[]>(this.awsProductsUrl).pipe(
      tap((awsProducts) => this.log('fetched awsProducts')),
      catchError(this.handleError<AWS_PRODUCT[]>('getAwsProducts', []))
    );
  }

  getAwsProduct(id: number): Observable<AWS_PRODUCT> {
    const url = `${this.awsProductsUrl}/${id}`;
    return this.http.get<AWS_PRODUCT>(url).pipe(
      tap((_) => this.log(`fetched awsProduct id=${id}`)),
      catchError(this.handleError<AWS_PRODUCT>(`getAwsProduct id=${id}`))
    );
  }

  updateAwsProduct(awsProduct: AWS_PRODUCT): Observable<any> {
    return this.http
      .put(this.awsProductsUrl, awsProduct, this.httpOptions)
      .pipe(
        tap((_) => this.log(`updated awsProduct id=${awsProduct.id}`)),
        catchError(this.handleError<any>(`updateAwsProduct`))
      );
  }

  addAwsProduct(awsProduct: AWS_PRODUCT): Observable<AWS_PRODUCT> {
    return this.http
      .post<AWS_PRODUCT>(this.awsProductsUrl, awsProduct, this.httpOptions)
      .pipe(
        tap((newAwsProduct: AWS_PRODUCT) =>
          this.log(`added awsProduct w/ id=${newAwsProduct.id}`)
        ),
        catchError(this.handleError<AWS_PRODUCT>('addAwsProduct'))
      );
  }

  deleteAwsProduct(id: number): Observable<AWS_PRODUCT> {
    const url = `${this.awsProductsUrl}/${id}`;

    return this.http.delete<AWS_PRODUCT>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted awsProduct id=${id}`)),
      catchError(this.handleError<AWS_PRODUCT>('deleteAwsProduct'))
    );
  }

  searchAwsProducts(term: string): Observable<AWS_PRODUCT[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<AWS_PRODUCT[]>(`${this.awsProductsUrl}/?name=${term}`)
      .pipe(
        tap((_) => this.log(`found awsProducts matching "${term}"`)),
        catchError(this.handleError<AWS_PRODUCT[]>('searchAwsProducts', []))
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
