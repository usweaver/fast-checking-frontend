import { Component } from '@angular/core';
import { UserStore } from '../../stores/user.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
})
export class FirstComponent {
  data: string = 'Hello';

  constructor(public userStore: UserStore) {}
}
