import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    @for (product of products; track product.id) {
            <mat-card>
                <mat-card-header>
                  <mat-card-title>{{ product.title }}</mat-card-title>
                </mat-card-header>
                <mat-card-actions>
                  <button mat-button>Editar</button>
                  <button mat-button>Deletar</button>
                </mat-card-actions>
              </mat-card>
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
