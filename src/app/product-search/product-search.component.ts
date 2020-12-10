import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  seachFor: string ;
  @Input() itemsFound: number ;
  @Output() setSearchFor = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  sendSearch(): void{
    this.setSearchFor.emit(this.seachFor);
  }

}
