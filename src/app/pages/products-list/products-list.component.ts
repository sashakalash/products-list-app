import { IProduct } from './../../interfaces/product.interface';
import { ITableHeader } from '@app/interfaces/table-header.interface';
import { TableComponent } from '@app/shared/table/table.component';
import { ProductsStore } from '@app/store/product.store';
import { Component, inject, signal } from '@angular/core';

const TABLE_HEADERS = [
  {
    value: 'title',
    title: 'title'
  },
  {
    value: 'price',
    title: 'price'
  },
  {
    value: 'thumbnail',
    title: 'thumbnail'
  },
  {
    value: 'rating',
    title: 'rating'
  },
];

@Component({
  selector: 'app-products-list',
  imports: [TableComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  providers: [ProductsStore],
})
export class ProductsListComponent {
  readonly store = inject(ProductsStore);

  tableHeaders: ITableHeader[] = TABLE_HEADERS;
  products = signal<IProduct[]>(this.store.products());
}
