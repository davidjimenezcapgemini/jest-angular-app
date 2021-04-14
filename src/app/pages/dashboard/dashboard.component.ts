import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any[] = [];
  selectedCards: any[] = [];
  deletedCards: any[] = [];
  tabs = [
    { name: 'Deleted Cards', selected: false, hidden: true, field: 'deleted', value: true },
    { name: 'Main Cards', selected: true, hidden: false, field: 'deleted', value: false }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users')
    .pipe( map( (res: any) => res.map( (user: any) => ({ ... user, deleted: false }) )))
    .subscribe((res: any) => {
      this.data = res;
    });
  }

  selectCard(id: number): void {
    const index = this.getCardSelectedIndex(id);
    if (index >= 0) {
      this.selectedCards.splice(index, 1);
    } else {
      this.selectedCards.push(id);
    }
  }

  getCardSelectedIndex(id: number): number {
    return this.selectedCards.findIndex(idUser => idUser === id);
  }

  deleteCards(): void {
    this.data = this.data.map(user => {
      const aux = { ... user };
      this.selectedCards.forEach(id => {
        if (id === aux.id) {
          aux.deleted = true;
        }
      });
      return aux;
    });
    this.selectedCards = [];
    this.tabs.forEach(tab => {
      tab.hidden = tab.value === true ? false : tab.hidden;
    });
  }

  tabClicked(name: string): void {
    this.tabs = this.tabs.map(tab => {
      tab.selected = tab.name === name ? true : false;
      return tab;
    });
  }

}
