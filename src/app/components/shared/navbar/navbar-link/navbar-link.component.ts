import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-link',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar-link.component.html',
})
export class NavbarLinkComponent {
  @Input() link: string = '';
  @Input() exactLink: boolean = false;
}
