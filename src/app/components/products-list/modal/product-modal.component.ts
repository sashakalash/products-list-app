import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IProduct } from '@app/interfaces/product.interface';
import { ProductsStore } from '@app/store/product.store';
import { Subject } from 'rxjs';

export interface DialogData {
  item: IProduct;
  isFavorite: boolean;
}

@Component({
  selector: 'app-product-modal',
  imports: [
    MatDialogContent,
    MatIconModule,
    MatDialogClose,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="title-wrapper">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <button mat-button mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <mat-dialog-content>
      <ul>
        <li>
          Description:
          <p>{{ data.description }}</p>
        </li>
        <li>
          Stock:
          <p>{{ data.stock }}</p>
        </li>
        <li>
          Price:
          <p>{{ data.price }}</p>
        </li>
        <li>
          Images:
          @for (url of data?.images; track url) {
            <p><img [src]="url" /></p>
          }
        </li>
      </ul>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button (click)="addToFavorite()">
        <mat-icon [class.isFavorite]="isFavorite()">favorite</mat-icon>
        {{ isFavorite() ? 'Remove from Favorite' : 'Add to Favorite' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 24px;

      h2 {
        font-size: 30px;
        padding: 0;
      }
    }

    mat-dialog-actions {
      justify-content: center;

      mat-icon.isFavorite {
        color: red;
      }
    }

    ul {
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;

      li {
        list-style-type: none;
        font-size: 20px;
        font-weight: 800;

        &:last-of-type {
          display: flex;
          align-items: flex-start;
        }

        p {
          font-size: 16px;
          font-weight: 300;
        }

        img {
          width: calc(100% - 48px);
        }
      }
    }
  `,
})
export class ProductModalComponent {
  readonly store = inject(ProductsStore);

  newFavorite = new Subject<boolean>();
  data = inject(MAT_DIALOG_DATA);
  isFavorite = computed(() => this.store.favorite().has(this.data));

  addToFavorite(): void {
    this.isFavorite() ? this.store.removeFromFavorite(this.data) : this.store.addToFavorite(this.data);
  }
}
