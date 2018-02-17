import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetFilter'
})
export class AssetFilterPipe implements PipeTransform {

  transform(assets: any, type: string): any {
    return assets.filter(asset => asset.type === type);
  }

}
