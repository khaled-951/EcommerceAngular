import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../model/Product';
import {CartService} from '../shared/cart.service';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  itemsFound: number ;
  constructor(private ProductServiceInstance: ProductService, private CartServiceInstance: CartService,
              private UserServiceInstance: UserService, private router: Router) { }

  ngOnInit(): void {
    this.ProductServiceInstance.readAllProducts().subscribe( data => this.products = data );
  }
  addProductToCart(productId: number): void{
    if (this.UserServiceInstance.currentUser === null){
      this.router.navigate(['login']);
    }
    else {
      this.CartServiceInstance.readCartByUserId(this.UserServiceInstance.currentUser.id).subscribe(
      (data) => {this.CartServiceInstance.addProductToCart(productId, 1, data);}
      );
    }
  }
  getSearchFor(data: string): void{
    this.ProductServiceInstance.readAllProducts().subscribe( x =>
    {
      this.products = x ;
      this.itemsFound = undefined ;
      if (data){
        this.products = this.products.filter( (y) =>  (y.name.indexOf(data) !== -1) || (y.description.indexOf(data) !== -1) || (y.price >= parseInt(data, 10)) );
        this.itemsFound = this.products.length ;
      }
    } );
  }
}
