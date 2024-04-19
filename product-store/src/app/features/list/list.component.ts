import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Delete file</h2>
<mat-dialog-content>
  Would you like to delete cat.jpeg?
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close>No</button>
  <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
</mat-dialog-actions>
`,
standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {}
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

  matDialog = inject(MatDialog);

  products: Product[] = [];

  ngOnInit() {
    this.productsService.getAllProducts()
    .subscribe((products) => {
      this.products = products
    })
  }
  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id])
  }
  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .subscribe((data) => {
      console.log('afterClosed', data);
    })
  }

}
