import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RegionsService } from '../service/regions.service';
import { BadgeComponent } from '../badge/badge.component';
import { Region } from '../model/model';

@Component({
  selector: 'app-create-report',
  imports: [MatButtonModule, BadgeComponent],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.scss',
  standalone: true
})
export class CreateReportComponent implements OnInit {
  private _bottomSheet = inject(MatBottomSheet);

  regionList = [];

  form = new FormGroup({
    regions: new FormControl<Region[]>([], { nonNullable: true, validators: [Validators.minLength(2), Validators.required] }),
    region: new FormControl<Region[]>([], { nonNullable: true, validators: [Validators.minLength(1), Validators.required] }),
  });

  constructor(private regionsService: RegionsService) {}

  ngOnInit(): void {
    this.loadRegions();
  }

  openMultiplySelect(): void {
    this._bottomSheet.open(SelectDialogComponent<Region>, {
      data: {
        options: this.regionList,
        multiple: true,
        control: this.form.controls.regions,
        nameProp: 'name',
        valueProp: 'id',
      },
      height: "calc(100% - 13px)"
    });
  }

  openSingleSelect(): void {
    this._bottomSheet.open(SelectDialogComponent<Region>, {
      data: {
        options: this.regionList,
        multiple: false,
        control: this.form.controls.region,
        nameProp: 'name',
        valueProp: 'id',
      },
      height: "calc(100% - 13px)"
    });
  }

  createReport() {
    console.log(this.form.getRawValue())
  }

  private loadRegions() {
    this.regionsService.getRegions().subscribe({
      next: result => this.regionList = result,
      error: error => console.log(error)
    })
  }
}
