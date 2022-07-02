import { HttpParams, HttpHeaders } from '@angular/common/http';

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
}
