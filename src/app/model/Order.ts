import {ProductsList} from './ProductsList';
export class Order{
  id: number;
  userId: number;
  productsList: ProductsList[] ;
  address: string;
  zipCode: number;
  State: string;
  phone: number;
}
