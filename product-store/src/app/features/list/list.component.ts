import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  template: `
  <div class="action-container">
    <a mat-raised-button color="primary" [routerLink]="['create-product']">Criar Produto</a>
  </div>
  @for (product of products; track product.id) {
    <app-card [product]="product"></app-card>
  }
  `,
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  productsService = inject(ProductsService)
  products: Product[] = [];

  ngOnInit() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products
    })

  }

}
