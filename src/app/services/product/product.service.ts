import { Injectable } from "@angular/core";
import { Product } from "src/app/interfaces/models/product";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _ from "lodash";
import { FilterService } from "src/app/engine/classes/filter-service/filter.service";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
/**
 *
 * @description execute method ngOnDestroy for reset filters
 * @export
 * @class ProductService
 * @extends {FilterService<Product>}
 */
@Injectable({
  providedIn: "root"
})
export class ProductService extends FilterService<Product> {
  constructor(afs: AngularFirestore, private http: HttpClient) {
    super(afs, "products");
  }

  public getProductsFromServer(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>("https://olympia-server-api.herokuapp.com/products");
  }

  public postPorduct(product: Product): void {
    this.http.post("https://olympia-server-api.herokuapp.com/products", product).subscribe();
  }

  public getProductTypes(): Observable<Array<any>> {
    return this.http.get<Array<any>>("https://olympia-server-api.herokuapp.com/products/types");
  }

  public postProductType(productType: any): void {
    this.http.post("https://olympia-server-api.herokuapp.com/products/types", productType).subscribe();
  }

  public errorHandler(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error("An error occurred:", err.error.message);
    } else {
      console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
