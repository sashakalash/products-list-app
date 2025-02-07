import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '@app/environments/environment';
import { IProduct, IProductCategory } from '@app/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private environment = environment;
  private apiUrl = this.environment.apiUrl;
  private http = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.http.get<any>(`${this.apiUrl}/${this.environment.api.getProducts}`).pipe(
      map(({ products }) => products),
      catchError(() => of([]))
    );
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http
      .get<any>(`${this.apiUrl}/${this.environment.api.getProductsByCategory.replace('${{category}}', category)}`)
      .pipe(
        map(({ products }) => products),
        catchError(() => of([]))
      );
  }

  getProductCategories(): Observable<IProductCategory[]> {
    return this.http.get<any>(`${this.apiUrl}/${this.environment.api.getProductCategories}`).pipe(
      catchError(() => of([]))
    );
  }
}
