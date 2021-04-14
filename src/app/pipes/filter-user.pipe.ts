import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(items: any[], tabs: any[]): any[] {
    let valueFilter: boolean;
    let field: string;
    tabs.forEach(tab => {
      if (tab.selected) {
        valueFilter = tab.value;
        field = tab.field;
      }
    });
    return items.filter(item => item[field] === valueFilter ? true : false);
  }

}
