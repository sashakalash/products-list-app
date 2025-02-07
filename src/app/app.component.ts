import { Component } from '@angular/core';
import { ProductsListComponent } from './components/products-list/products-list.component';


@Component({
  selector: 'app-root',
  imports: [ProductsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
