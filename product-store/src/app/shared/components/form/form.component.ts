import { Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-form',
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
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  product = input<Product | null>(null);
  form!: FormGroup;

  @Output() done = new EventEmitter<Product>();
  
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
   
  }
  onSubmit(){
    const product = this.form.value as Product;
    this.done.emit(product);
  }
}
