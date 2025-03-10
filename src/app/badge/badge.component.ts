import { Component, Input, input } from '@angular/core';
import { Region } from '../model/model';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  standalone: true,
})
export class BadgeComponent {
  @Input({required: true}) region!: Region;
}
