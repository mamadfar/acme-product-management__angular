import { Injectable } from '@angular/core';
import { IProduct } from '../types/product.type';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, catchError, tap, throwError} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ProductService {

  private productUrl = "api/products/products.json";

  constructor(private http: HttpClient){}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log(`All: ${JSON.stringify(data)}`)),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse){
    let errMsg = "";

    if(err.error instanceof ErrorEvent) errMsg = `An error occurred: ${err.error.message}`;
    else errMsg = `Server returned code: ${err.status}, error message is: ${err.error.message}`;

    console.log(errMsg);
    // return throwError(() => errMsg)
    return throwError(() => errMsg)
  }
}
