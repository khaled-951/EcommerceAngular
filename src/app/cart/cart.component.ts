import { Component, OnInit } from '@angular/core';
import {Cart} from '../model/Cart';
import {CartService} from '../shared/cart.service';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {Product} from '../model/Product';
import {ProductsList} from '../model/ProductsList';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = new Cart();
  productsDetails: Product[] = [];
  //updatedQuantity

  constructor(private CartServiceInstance: CartService, private UserServiceInstance: UserService, private router: Router, private ProductServiceInstance: ProductService) { }

  ngOnInit(): void {
    if (!this.UserServiceInstance.currentUser) {
      this.router.navigate(['login']);
    } else {
      this.CartServiceInstance.readCartByUserId(this.UserServiceInstance.currentUser.id).subscribe(
        (data: Cart) => {
          this.cart.id = data.id;
          this.cart.productsList = data.productsList;
          this.cart.productsList.forEach( (item, index) => {
            this.ProductServiceInstance.readProductById(item.productId).subscribe( (res) => {this.productsDetails.push(res); } );
          });
        }
      );
    }
  }
  deleteAllItems(): void{
    this.CartServiceInstance.deleteCartProducts(this.UserServiceInstance.currentUser.id).subscribe(
      (data) => {this.cart = data; }
    );
  }
  deleteProductFromCart(productId: number): void{
    this.cart = this.CartServiceInstance.deleteProductFromCart(this.UserServiceInstance.currentUser.id, productId);
  }
  getProductName(productId: number): string{
    const i = this.productsDetails.findIndex( x => x.id === productId) ;
    let res = 'NameNotFound';
    if (i > -1) {
      res = this.productsDetails[i].name;
    }
    return res ;
  }
  getProductDescription(productId: number): string{
    const i = this.productsDetails.findIndex( x => x.id === productId) ;
    let res = 'DescriptionNotFound';
    if (i > -1) {
      res = this.productsDetails[i].description;
    }
    return res ;
  }
  getProductImage(productId: number): string{
    const i = this.productsDetails.findIndex( x => x.id === productId) ;
    let res = 'ImageNotFound';
    if (i > -1) {
      res = this.productsDetails[i].image;
    }
    return res ;
  }
  getProductPrice(productId: number): number{
    const i = this.productsDetails.findIndex( x => x.id === productId) ;
    let res = 0;
    if (i > -1) {
      res = this.productsDetails[i].price;
    }
    return res ;
  }
  increaseProductQuantity(productId: number, quantityToAdd: number): void{
    if (quantityToAdd > 0) {
      this.cart.productsList[this.cart.productsList.findIndex(x => x.productId === productId)].productQuantity += quantityToAdd;
      this.CartServiceInstance.updateCartProductQuantity(this.UserServiceInstance.currentUser.id, productId,
        this.cart.productsList[this.cart.productsList.findIndex(x => x.productId === productId)].productQuantity);
    }
  }
  decreaseProductQuantity(productId: number, quantityToSub: number): void{
    if (quantityToSub > 0 && this.cart.productsList[this.cart.productsList.findIndex(x => x.productId === productId)].productQuantity > 1) {
      this.cart.productsList[this.cart.productsList.findIndex(x => x.productId === productId)].productQuantity -= quantityToSub;
      this.CartServiceInstance.updateCartProductQuantity(this.UserServiceInstance.currentUser.id, productId,
        this.cart.productsList[this.cart.productsList.findIndex(x => x.productId === productId)].productQuantity);
    }
  }
  updateProductQuantity(productId: number): void{
    if (this.cart.productsList[this.cart.productsList.findIndex( x => x.productId === productId )].productQuantity > 1){
      this.CartServiceInstance.updateCartProductQuantity(this.UserServiceInstance.currentUser.id, productId,
        this.cart.productsList[this.cart.productsList.findIndex(x => x.productId === productId)].productQuantity);
    }
  }
}
