import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-second',
  imports: [],
  templateUrl: './second.component.html',
  styleUrl: './second.component.css',
})
export class SecondComponent {
  data: string[] = [];

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.get('messages').subscribe((response) => {
      console.log(response);
    });
  }
}
