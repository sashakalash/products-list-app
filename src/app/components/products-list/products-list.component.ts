import { MatTabsModule } from '@angular/material/tabs';
import { IProduct, IProductCategory } from '../../interfaces/product.interface';
import { ProductGridComponent } from '@app/components/products-list/grid/product-grid.component';
import { ProductsStore } from '@app/store/product.store';
import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';

import { ISelectData, SelectComponent } from '@app/shared/select/select.component';
import { ISelectOption } from '@app/interfaces/select-options.interface';
import { ProductModalComponent } from './modal/product-modal.component';

const SELECT_DATA: ISelectData = {
  title: 'Choose category',
  clearOpt: 'All',
};

@Component({
  selector: 'app-products-list',
  imports: [ProductGridComponent, SelectComponent, MatProgressBarModule, MatTabsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-tab-group>
      <mat-tab label="Products">
        <app-select [options]="productCategories()" (selected)="onSelected($event)" [selectData]="selectData" />
        @if (store.isLoading()) {
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        } @else {
          <app-product-grid [data]="products()" (itemSelected)="onSelectedRow($event)" />
        }
      </mat-tab>
      <mat-tab label="Favorite">
        @let favorites = favorite();
        @if(favorites.length) {
          <app-product-grid [data]="favorites" (itemSelected)="onSelectedRow($event)" />
        }
        @else {
          Add product to Favorite...
        }
      </mat-tab>
    </mat-tab-group>
  `,
})
export class ProductsListComponent implements OnInit {
  readonly store = inject(ProductsStore);
  readonly dialog = inject(MatDialog);
  readonly selectData: ISelectData = SELECT_DATA;

  products = computed<IProduct[]>(() => this.store.products());
  productCategories = computed<ISelectOption[]>(() =>
    this.store.categories().map((cat: IProductCategory) => ({ value: cat.slug, label: cat.name }))
  );
  favorite = computed<IProduct[]>(() => Array.from(this.store.favorite()));
  selectedRow = model<IProduct | null>();

  ngOnInit(): void {
    this.store.loadAll(this.store);
    this.store.loadCategories(this.store);
  }

  onSelected(value: string): void {
    this.store.setFilter(value);
  }

  onSelectedRow(item: IProduct): void {
    this.selectedRow.set(item);
    this.dialog
      .open(ProductModalComponent, {
        width: '1200px',
        height: '900px',
        data: this.selectedRow(),
      })
      .afterClosed()
      .subscribe(() => this.selectedRow.set(null));
  }
}
