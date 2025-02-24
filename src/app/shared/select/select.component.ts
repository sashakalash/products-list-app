import { Component, input, output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ISelectOption } from '@app/interfaces/select-options.interface';

export interface ISelectData {
  title: string;
  clearOpt: string;
}

@Component({
  selector: 'app-select',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule],
  template: `
    @let data = selectData();
    <mat-form-field>
      <mat-label>{{ data.title }}</mat-label>
      <mat-select (selectionChange)="onSelectionChange($event.value)">
        <mat-option>{{ data.clearOpt }}</mat-option>
        @for (option of options(); track option) {
          <mat-option [value]="option.value">{{ option.label }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `
})
export class SelectComponent {
  options = input.required<ISelectOption[]>();
  selected = output<string>();
  selectData = input.required<ISelectData>({});
  title = input<string>('Choose an option');

  onSelectionChange(value: string) {
    this.selected.emit(value);
  }
}
