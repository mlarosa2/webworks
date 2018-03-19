import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formResponse'
})
export class FormResponsePipe implements PipeTransform {

  transform(props: string[]): any {
    if (props) {
      return props.filter(prop => {
        return    (prop !== '_id' 
                && prop !== 'wwbelongstocheck33245'
                && prop !== 'wwdatesubmitcheck33254'
                && prop !== 'wwreadsubmitcheck33254');
      });
    }
  }

}
