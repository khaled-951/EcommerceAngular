import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../model/Product';
import {CartService} from '../shared/cart.service';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  itemsFound: number ;
  priceMaxFilter: number ;
  priceMinFilter: number ;
  colorFilter: string ;
  constructor(private ProductServiceInstance: ProductService, private CartServiceInstance: CartService,
              private UserServiceInstance: UserService, private router: Router, private modalService: NgbModal) { }

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
        this.products = this.products.filter( (y) =>  (y.name.indexOf(data) !== -1) || (y.description.indexOf(data) !== -1) || (y.color.indexOf(data) !== -1) || (y.price === parseInt(data, 10)) );
        this.itemsFound = this.products.length ;
      }
    } );
  }
  getPriceMinFilter(data: number): void{
    this.ProductServiceInstance.readAllProducts().subscribe( x =>
    {
      this.products = x ;
      this.itemsFound = undefined ;
      if (data){
        this.priceMinFilter = data ;
        if (this.priceMaxFilter ){
          this.products = this.products.filter( (y) => y.price <= this.priceMaxFilter );
        }
        if (this.colorFilter ){
          this.products = this.products.filter( (y) => y.color.indexOf(this.colorFilter) !== -1 );
        }
        this.products = this.products.filter( (y) => y.price >= data );
        this.itemsFound = this.products.length ;
      }
    } );
  }
  getPriceMaxFilter(data: number): void{

    this.ProductServiceInstance.readAllProducts().subscribe( x =>
    {
      this.products = x ;
      this.itemsFound = undefined ;
      if (data){
        this.priceMaxFilter = data ;
        if (this.priceMinFilter ){
          this.products = this.products.filter( (y) => y.price >= this.priceMinFilter );
        }
        if (this.colorFilter ){
          this.products = this.products.filter( (y) => y.color.indexOf(this.colorFilter) !== -1 );
        }
        this.products = this.products.filter( (y) => y.price <= data );
        this.itemsFound = this.products.length ;
      }
    } );
  }
  getColorFilter(data: string): void{
    this.colorFilter = undefined ;
    this.ProductServiceInstance.readAllProducts().subscribe( x =>
    {
      this.products = x ;
      this.itemsFound = undefined ;
      if (data !== '' ){
        this.colorFilter = data ;
        this.products = this.products.filter( (y) => y.color.indexOf(data) !== -1 );
      }
      if (this.priceMaxFilter ){
        this.products = this.products.filter( (y) => y.price <= this.priceMaxFilter );
      }
      if (this.priceMinFilter ){
        this.products = this.products.filter( (y) => y.price >= this.priceMinFilter );
      }
      this.itemsFound = this.products.length ;
    } );
  }
  open(content): void {
    if (this.UserServiceInstance.currentUser !== null) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }
  }
}
