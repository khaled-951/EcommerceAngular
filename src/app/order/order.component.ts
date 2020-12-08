import { Component, OnInit } from '@angular/core';
import {Order} from '../model/Order';
import {OrderService} from '../shared/order.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../shared/cart.service';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order = new Order();
  orderForm: FormGroup;
  productsCost = 0;
  productsQuantity = 0;

  constructor(private OrderServiceInstance: OrderService, private router: Router, private modalService: NgbModal,
              private UserServiceInstance: UserService, private CartServiceInstance: CartService, private ProductServiceInstance: ProductService) { }

  ngOnInit(): void {
    if (this.UserServiceInstance.currentUser === null)
    { this.router.navigate(['login']); }
    this.orderForm = new FormGroup({
      address: new FormControl(this.order?.address, [Validators.required, Validators.minLength(3), Validators.maxLength(90)]),
      zipcode: new FormControl(this.order?.zipCode, [Validators.required, Validators.min(0), Validators.max(1000000000)]),
      state: new FormControl(this.order?.State, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      phone: new FormControl(this.order?.phone, [Validators.required, Validators.min(100000), Validators.max(10000000000000)])
    });
    this.OrderServiceInstance.readOrdersByUser(this.UserServiceInstance.currentUser.id).subscribe(
      (x) => { this.order = x[0]; }
    );
    this.CartServiceInstance.readCartByUserId(this.UserServiceInstance.currentUser.id).subscribe(
      x => x.productsList.forEach( (item, index) =>
        this.ProductServiceInstance.readProductById(item.productId).subscribe( x => {this.productsCost += x.price * item.productQuantity; this.productsQuantity += 1;}))
    );
  }
  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  updateOrderDetails(): void {
    this.CartServiceInstance.readCartByUserId(this.UserServiceInstance.currentUser.id).subscribe(
      x => { this.order.productsList = x.productsList; this.OrderServiceInstance.updateOrder(this.order).subscribe();}
    );
  }
  getProductsNumber(): number{
    return this.productsQuantity;
  }
}
