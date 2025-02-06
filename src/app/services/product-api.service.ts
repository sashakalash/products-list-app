import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '@app/environments/environment';
import { IProduct, IProductCategory } from '@app/interfaces/product.interface';

export class ProductApiService {
  private environment = environment;
  private apiUrl = this.environment.apiUrl;
  private http = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.http.get<any>(`${this.apiUrl}/${this.environment.api.getProducts}`).pipe(
      map(({ data }) => data.plots),
      catchError(() => of([]))
    );
  }

  getByCategory(category: string): Observable<IProduct[]> {
    return this.http
      .get<any>(`${this.apiUrl}/${this.environment.api.getProducts.replace('${{category}}', category)}`)
      .pipe(
        map(({ data }) => data.plots),
        catchError(() => of([]))
      );
  }

  getProductCategories(): Observable<IProductCategory[]> {
    return this.http.get<any>(`${this.apiUrl}/${this.environment.api.getProductCategories}`).pipe(
      map(({ data }) => data.plots),
      catchError(() => of([]))
    );
  }
}
