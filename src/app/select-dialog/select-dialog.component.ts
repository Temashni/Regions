import { Component, DestroyRef, Inject, inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatRadioButton } from '@angular/material/radio';

// можно было ьбы сделать эти поля динамическими и передавать из вне, но я подумал, что это будет оверхед для текущей задачи
// но данной реализацией я оставил возможность для будущего расширения
export interface ISelectDialogOptionBase {
  name: string,
  id: number,
}

export interface ISelectDialogData<T> {
  multiple: boolean;
  control: FormControl<T[]>;
  options: T[];
}

@Component({
  selector: 'app-city-list-dialog',
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule, MatRadioButton],
  templateUrl: './select-dialog.component.html',
  styleUrl: './select-dialog.component.scss',
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } }
  ],
  standalone: true,
})
export class SelectDialogComponent<T extends ISelectDialogOptionBase> implements OnInit { //
  private readonly destroyRef = inject(DestroyRef);
  private bottomSheetRef =
    inject<MatBottomSheetRef<SelectDialogComponent<T>>>(MatBottomSheetRef);

  search = new FormControl<string>('', { nonNullable: true });
  filteredValues: T[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ISelectDialogData<T>,
  ) {}

  ngOnInit(): void {
    this.filteredValues = this.data.options;
    this.filterRegions();
  }

  filterRegions() {
    this.search.valueChanges.pipe(
      // debounceTime(1000) // если придется делать запрос на бек
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      this.filteredValues = this.data.options.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
    })
  }

  onCheckboxChange(checked: boolean, option: T) {
    const { control } = this.data;
    let newValue;
    if (checked) {
      newValue = [...control.value , {...option}]
    } else {
      newValue = control.value.filter(x => x.id !== option.id);
    }
    control.setValue(newValue)
  }

  onRadioChange(option: T) {
    const { control } = this.data;
    control.setValue([option]);
  }

  checkItemChecked(option: T): boolean {
    const { control } = this.data;
    return control.value.some(x => x.id === option.id);
  }

  closeDialog(): void {
    this.bottomSheetRef.dismiss();
  }
}
