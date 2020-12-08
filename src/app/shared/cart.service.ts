import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../model/Cart';
import {Product} from '../model/Product';
import {ProductsList} from '../model/ProductsList';
import {tryCatch} from 'rxjs/internal-compatibility';
import {ProductService} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CartsUrl = 'http://127.0.0.1:3000/Cart';

  constructor(private http: HttpClient, private ProductServiceInstance: ProductService) { }

  readCartByUserId(id: number): Observable<Cart>{
    return this.http.get<Cart>(this.CartsUrl + '/' + id);
  }

  addProductToCart(productIdToAdd: number, productToAddQuantity: number, cartToAddTo: Cart): Cart {
    let result: Cart ;
    const productlist = new ProductsList() ;
    let i = 0 ;
    productlist.productId = productIdToAdd;
    productlist.productQuantity = productToAddQuantity;
    i = cartToAddTo.productsList.findIndex( x => x.productId === productIdToAdd);
    if (i > -1 ) {
      cartToAddTo.productsList[i].productQuantity += productToAddQuantity ;
    }
    else {
      cartToAddTo.productsList.push(productlist);
    }
    this.ProductServiceInstance.readProductById(productIdToAdd).subscribe( () => {
      this.http.put<Cart>(this.CartsUrl + '/' + cartToAddTo.id, cartToAddTo)
        .subscribe((data) => {result = data}, () => {
          this.http.post<Cart>(this.CartsUrl, cartToAddTo).subscribe((data) => result = data);
        }, () => {});
    });

    return result ;
  }

  updateCartProductQuantity(userId: number, productId: number, newQuantity: number): void{
    let productIndex: number ;
    this.http.get<Cart>(this.CartsUrl + '/' + userId).subscribe(
      (data) => {
        productIndex = data.productsList.findIndex(x => x.productId === productId);
        console.log(productIndex);
        if (productIndex > -1){
          data.productsList[productIndex].productQuantity = newQuantity;
          this.http.put<Cart>(this.CartsUrl + '/' + userId, data).subscribe();
        }
      },
      () => {},
      () => {}
    );

  }

  deleteCartProducts(userId: number): Observable<Cart>{
    const c = new Cart();
    c.id = userId ;
    c.productsList = [] ;
    return this.http.put<Cart>(this.CartsUrl + '/' + userId, c);
  }

  deleteCart(userId: number): Observable<Cart>{
    return this.http.delete<Cart>(this.CartsUrl + '/' + userId);
  }

  deleteProductFromCart(userId: number, productId: number): Cart{
    let c = new Cart();
    c.id = userId ;
    c.productsList = [] ;
    this.http.get<Cart>(this.CartsUrl + '/' + userId).subscribe(
      (data) => {
        c.productsList = data.productsList.filter( x => {return x.productId !== productId; }) ;
        this.http.put<Cart>(this.CartsUrl + '/' + userId, c).subscribe( x => { c = x; }); }
      );
    return c ;
  }
}
