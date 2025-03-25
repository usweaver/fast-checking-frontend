import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [NgClass],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input() size: 'md' | 'lg' = 'md';
}
