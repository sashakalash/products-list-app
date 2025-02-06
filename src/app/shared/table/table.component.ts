import { Component, computed, input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ITableHeader } from '@app/interfaces/table-header.interface';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  columns = input.required<ITableHeader[]>();
  displayedColumns = computed(() => this.columns().map((column: ITableHeader) => column.value))
  tableData = input.required<Array<{ [key: string]: any }>>();
  dataSource = computed(() => {
    const table = new MatTableDataSource(this.tableData());
    return table;
  });

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
}
