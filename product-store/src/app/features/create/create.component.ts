import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit" class="form-container">
        <div class="form-content-container">
          <mat-form-field>
            <mat-label>Titulo Produto</mat-label>
            <input matInput type="text" formControlName="title" placeholder="Título">
          </mat-form-field>
          <button type="submit" mat-raised-button color="accent" (click)="onSubmit()">Salvar Produto</button>
        </div>
      </form>
  `,
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  productService = inject(ProductsService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar)
  form = new FormGroup({

    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit() {
    this.productService.postProduct({
      title: this.form.controls.title.value
    })
      .subscribe(() => {
        this.matSnackBar.open('Produto adicionado com sucesso!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.router.navigateByUrl('/').catch(console.log)
      })
    this.form.controls.title.value;
  }
}
