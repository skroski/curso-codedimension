import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  productsService = inject(ProductsService)
  products: any[] = [];
  
  ngOnInit(){
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products
    })
  
  }

}
