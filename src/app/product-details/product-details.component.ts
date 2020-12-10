import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/product.service';
import {Product} from '../model/Product';
import {CartService} from '../shared/cart.service';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product ;

  constructor(private route: ActivatedRoute, private ProductServiceInstance: ProductService,
              private CartServiceInstance: CartService, private UserServiceInstance: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( x => this.ProductServiceInstance.readProductById(x.id).subscribe( y => this.product = y ));
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

}
