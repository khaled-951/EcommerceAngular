import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersUrl = 'http://127.0.0.1:3000/Orders';

  constructor(private http: HttpClient) { }

  readAllOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.ordersUrl);
  }

  readOrdersByUser(userId: number): Observable<Order[]>{
    return this.http.get<Order[]>(this.ordersUrl + '?userId=' + userId);
  }

  readOrderByOrderId(orderId: number): Observable<Order>{
    return this.http.get<Order>(this.ordersUrl + '?id=' + orderId);
  }

  addOrder(newOrder: Order): Observable<Order>{
    return this.http.post<Order>(this.ordersUrl, newOrder);
  }

  deleteOrder(orderIdToDelete: number): Observable<Order>{
    return this.http.delete<Order>(this.ordersUrl + '/' + orderIdToDelete);
  }

  updateOrder(orderToUpdate: Order): Observable<Order>{
    return this.http.put<Order>(this.ordersUrl + '/' + orderToUpdate.id, orderToUpdate);
  }
}
