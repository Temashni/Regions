import { Routes } from '@angular/router';
import { CreateReportComponent } from './create-report/create-report.component';


export const routes: Routes = [
  {
    path: '',
    component: CreateReportComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
