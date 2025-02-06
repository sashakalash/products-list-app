import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
