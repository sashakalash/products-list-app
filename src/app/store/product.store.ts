import { inject, InjectionToken } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { IProduct, IProductCategory } from '@app/interfaces/product.interface';
import { ProductApiService } from '@app/services/product-api.service';

const PRODUCTS_STATE = new InjectionToken<ProductsState>('ProductsState', {
  factory: () => initialState,
});

type ProductsState = {
  products: IProduct[];
  categories: IProductCategory[];
  isLoading: boolean;
  filter: { query: string; };
};

const initialState: ProductsState = {
  products: [],
  categories: [],
  isLoading: false,
  filter: { query: '' },
};

export const ProductsStore = signalStore(
  withDevtools('products-store'),
  withState(() => inject(PRODUCTS_STATE)),
  withMethods((store, productApiService = inject(ProductApiService)) => ({
    setFilter(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
      if (query) {
        this.loadByQuery(query);
      } else {
        this.loadAll(store);
      }
    },
    loadAll: rxMethod(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return productApiService.getProducts().pipe(
            tapResponse({
              next: (products: IProduct[]) => patchState(store, { products, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
    loadByQuery: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return productApiService.getByCategory(store.filter.query()).pipe(
            tapResponse({
              next: (products: IProduct[]) => patchState(store, { products, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
    loadCategories: rxMethod(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return productApiService.getProductCategories().pipe(
            tapResponse({
              next: (categories: IProductCategory[]) => patchState(store, { categories, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  }))
);
