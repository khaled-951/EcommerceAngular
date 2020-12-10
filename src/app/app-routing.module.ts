import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {CartComponent} from './cart/cart.component';
import {OrderComponent} from './order/order.component';
import {UserComponent} from './user/user.component';
import {AppComponent} from './app.component';
import {ProductDetailsComponent} from './product-details/product-details.component';

const routes: Routes = [
  { path: 'login', component: UserComponent},
  { path: 'product/:id', component: ProductDetailsComponent},
  { path: 'products', component: ProductComponent},
  { path: 'order', component: OrderComponent},
  { path: 'cart', component: CartComponent},
  { path: '', component: UserComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
