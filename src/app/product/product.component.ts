import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../model/Product';
import {CartService} from '../shared/cart.service';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  singleProduct: Product;
  constructor(private ProductServiceInstance: ProductService, private CartServiceInstance: CartService, private UserServiceInstance: UserService) { }

  ngOnInit(): void {
    this.ProductServiceInstance.readAllProducts().subscribe( data => this.products = data );
  }
  addProductToCart(productId: number): void{
    this.CartServiceInstance.readCartByUserId(this.UserServiceInstance.currentUser.id).subscribe(
      (data) => {this.CartServiceInstance.addProductToCart(productId, 1, data);}
    );
  }
}
