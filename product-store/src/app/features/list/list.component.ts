import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { DialogConfirmationService } from '../../shared/services/dialog-confirmation.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  template: `
  <div class="action-container">
    <a mat-raised-button color="primary" [routerLink]="['create-product']">Criar Produto</a>
  </div>
  @for (product of products; track product.id) {
    <app-card [product]="product" (delete)="onDelete(product)" (edit)="onEdit(product)"></app-card>
  }
  `,
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  productsService = inject(ProductsService);
  router = inject(Router);
  dialogConfirmationService = inject(DialogConfirmationService);
  products: Product[] = [];

  ngOnInit() {
    this.getAllProductsList();
  }
  getAllProductsList() {
    this.productsService.getAllProducts()
      .subscribe((products) => {
        this.products = products
      })
  }
  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id])
  }
  onDelete(product: Product) {
    this.dialogConfirmationService.openDialog()
    
    .pipe(filter((answer) => answer === true))
    .subscribe((answer) => {
        this.productsService.deleteProduct(product.id).subscribe(() => {
          this.getAllProductsList();
        })
    })

  }

}
