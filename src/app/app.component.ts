import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jest-app';
  data: any;

  constructor(private http: HttpClient) {}

  @Output() finishEv: EventEmitter<object> = new EventEmitter();

  fireFinish(data: object): void {
    this.finishEv.emit(data);
  }

  calculateIva(price: number): number {
    return typeof price === 'number' ? price * 0.21 : 0;
  }

  getDataFromSource(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve('Data from observable'), 1000);
    });
  }

  getDataFromAPI(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(res => {
      this.data = res;
    });
  }
}
