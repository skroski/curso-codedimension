import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from "../../shared/components/form/form.component";
@Component({
    selector: 'app-create',
    standalone: true,
    template: `
    <app-form (done)="onSubmit($event)"></app-form>
  `,
    styleUrl: './create.component.scss',
    imports: [FormComponent]
})
export class CreateComponent {
  productService = inject(ProductsService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar)
 
  onSubmit(product: Product) {
    this.productService
      .postProduct(product)
      .subscribe(() => {
        this.matSnackBar.open('Produto criado com sucesso!', 'Ok')
        this.router.navigateByUrl('/');
      })
  }
}
