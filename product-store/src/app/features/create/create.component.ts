import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

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
          <button type="submit" mat-raised-button color="accent">Salvar Produto</button>
        </div>
      </form>
  `,
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  form = new FormGroup({

    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit() {

    this.form.controls.title.value;

  }

}
