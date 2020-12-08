import { Component, OnInit } from '@angular/core';
import {Cart} from '../model/Cart';
import {CartService} from '../shared/cart.service';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = new Cart();

  constructor(private CartServiceInstance: CartService, private UserServiceInstance: UserService, private router: Router) { }

  ngOnInit(): void {
    if (!this.UserServiceInstance.currentUser) {
      this.router.navigate(['login']);
    } else {
      this.CartServiceInstance.readCartByUserId(this.UserServiceInstance.currentUser.id).subscribe(
        (data: Cart) => {
          this.cart.id = data.id;
          this.cart.productsList = data.productsList;
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
}
