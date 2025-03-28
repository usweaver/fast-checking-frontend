import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-link',
  imports: [RouterLink],
  templateUrl: './card-link.component.html',
})
export class CardLinkComponent {
  @Input() link: string = '';
}
