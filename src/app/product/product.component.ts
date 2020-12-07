import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../model/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  singleProduct: Product;
  constructor(private ProductServiceInstance: ProductService) { }

  ngOnInit(): void {
    this.ProductServiceInstance.readAllProducts().subscribe( data => this.products = data );
  }

  getIt(): void {
    this.ProductServiceInstance.readProductById(2).subscribe( data => this.singleProduct = data );
  }

}
