import { Component, OnInit } from '@angular/core';
import {Cart} from '../model/Cart';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = new Cart();

  constructor(private CartServiceInstance: CartService) { }

  ngOnInit(): void {
    this.CartServiceInstance.readCartByUserId(2).subscribe(
      (data: Cart) => { this.cart.id = data.id; this.cart.productsList = data.productsList; }
    );
    /*this.CartServiceInstance.addProductToCart(1, 2, this.cart);*/
  }

  addToCart(){
    this.cart.id = 4 ;
    //console.log(this.cart.productsList);
    this.CartServiceInstance.addProductToCart(3, 10, this.cart);
    //this.CartServiceInstance.deleteCart(5).subscribe();
    //this.CartServiceInstance.deleteCartProducts(2).subscribe();
    //this.CartServiceInstance.updateCartProductQuantity(1, 3, 5);
  }

}
