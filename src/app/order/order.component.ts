import { Component, OnInit } from '@angular/core';
import {Order} from '../model/Order';
import {OrderService} from '../shared/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order = new Order();

  constructor(private OrderServiceInstance: OrderService) { }

  ngOnInit(): void {
    //this.OrderServiceInstance.readOrderByOrderId(1).subscribe(data => console.log(data));

    /*this.o.id = 53 ;
    this.o.address = 'hello world !';
    this.OrderServiceInstance.updateOrder(this.o).subscribe();*/


    //this.OrderServiceInstance.addOrder(this.o).subscribe();

    //this.OrderServiceInstance.deleteOrder(4).subscribe();
  }

}
