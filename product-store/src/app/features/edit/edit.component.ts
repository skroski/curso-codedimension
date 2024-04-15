import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  template: `
<app-form [product]="product" (done)="onSubmit($event)"></app-form>
`,
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  productService = inject(ProductsService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar)

  product: Product = inject(ActivatedRoute).snapshot.data['product']


  onSubmit(product: Product) {
    this.productService
      .putProduct(this.product.id, product)
      .subscribe(() => {
        this.matSnackBar.open('Produto editado com sucesso!', 'Ok')
        this.router.navigateByUrl('/');
      })
  }
}