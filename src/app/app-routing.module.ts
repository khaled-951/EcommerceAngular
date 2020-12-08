import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {CartComponent} from './cart/cart.component';
import {OrderComponent} from './order/order.component';
import {UserComponent} from './user/user.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: 'products', component: ProductComponent},
  { path: 'orders', component: OrderComponent},
  { path: 'cart', component: CartComponent},
  { path: 'login', component: UserComponent},
  { path: '', component: UserComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
