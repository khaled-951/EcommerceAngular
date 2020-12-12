import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  seachFor: string ;
  priceMaxFilter: number ;
  priceMinFilter: number ;
  colorFilter: string ;
  @Input() itemsFound: number ;
  @Output() setSearchFor = new EventEmitter<string>();
  @Output() setPriceMaxFilter = new EventEmitter<number>();
  @Output() setPriceMinFilter = new EventEmitter<number>();
  @Output() setColorFilter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  sendSearch(): void{
    this.priceMinFilter = undefined ;
    this.priceMaxFilter = undefined ;
    this.colorFilter = '' ;
    this.setSearchFor.emit(this.seachFor);
  }
  sendPriceMaxFilter(): void{
    this.seachFor = '' ;
    this.setPriceMaxFilter.emit(this.priceMaxFilter);
  }
  sendPriceMinFilter(): void{
    this.seachFor = '' ;
    this.setPriceMinFilter.emit(this.priceMinFilter);
  }
  sendColorFilter(): void{
    this.seachFor = '' ;
    this.setColorFilter.emit(this.colorFilter);
  }
}
