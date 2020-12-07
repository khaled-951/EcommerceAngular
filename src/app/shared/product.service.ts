import { Injectable } from '@angular/core';
import {Product} from '../model/Product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsUrl = 'http://127.0.0.1:3000/Products';

  constructor(private http: HttpClient) { }

  readAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productsUrl);
  }

  readProductById(id: number): Observable<Product>{
    return this.http.get<Product>(this.productsUrl + '/' + id);
  }
}
