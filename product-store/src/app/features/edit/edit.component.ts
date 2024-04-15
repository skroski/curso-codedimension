import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
  <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
    <div class="form-content-container">
      <mat-form-field>
        <mat-label>Titulo Produto</mat-label>
        <input matInput type="text" formControlName="title" placeholder="Título">
      </mat-form-field>
      <button type="submit" mat-raised-button color="accent" (click)="onSubmit()">Salvar Produto</button>
    </div>
  </form>
`,
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  productService = inject(ProductsService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar)

  product: Product = inject(ActivatedRoute).snapshot.data['product']


  form = new FormGroup({
    title: new FormControl<string>(this.product.title, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  onSubmit() {
    this.productService
      .putProduct(this.product.id,  {
        title: this.form.controls.title.value,
      })
      .subscribe(() => {
        this.matSnackBar.open('Produto editado com sucesso!', 'Ok')
        this.router.navigateByUrl('/');
      })
  }
}
