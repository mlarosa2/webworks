import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHomePage'
})
export class FilterHomePagePipe implements PipeTransform {

  transform(pages: string[]): any {
    if (pages) {
      return pages.filter(page => page !== 'HOMEPAGE' && page !== '404');
    }

    return [];
  }

}
