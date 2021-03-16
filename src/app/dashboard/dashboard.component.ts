import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res: any) => {
      this.data = res;
      console.log(res);
    });
  }


}
