import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data = [{
    title: 'Hello World',
    data: 'Das ist das Haus vom Nikolaus'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
