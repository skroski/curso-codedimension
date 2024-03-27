import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
        <mat-card>
            <mat-card-header>
              <mat-card-title>{{ productTitle() }}</mat-card-title>
            </mat-card-header>
            <mat-card-actions>
              <button mat-button>Editar</button>
              <button mat-button>Deletar</button>
            </mat-card-actions>
          </mat-card>
  `,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  product = input.required<Product>();
  productTitle = computed(() => this.product().title);

}
