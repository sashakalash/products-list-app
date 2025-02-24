import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { IProduct } from '@app/interfaces/product.interface';

@Component({
  selector: 'app-product-grid',
  imports: [CommonModule, MatGridListModule, MatCardModule],
  template: `
    <mat-grid-list cols="4" rowHeight="2:2" gutterSize="16px">
      <mat-grid-tile *ngFor="let product of data()">
        <mat-card appearance="outlined" (click)="onSelectRow(product)">
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title>{{ product.title }}</mat-card-title>
              <mat-card-subtitle>
                <p>Price: {{ product.price }}</p>
              </mat-card-subtitle>
              <img mat-card-xl-image [src]="product.thumbnail" />
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <p>Rating: ⭐{{ product.rating }}</p>
          </mat-card-content>
        </mat-card>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styles: `
    mat-card {
      width: 100%;
      cursor: pointer;

      &:hover {
        border: 1px solid rgb(153, 14, 14)
      }
    }
  `,
})
export class ProductGridComponent {
  itemSelected = output<IProduct>();
  data = input.required<IProduct[]>();

  onSelectRow(item: IProduct): void {
    this.itemSelected.emit(item);
  }
}
