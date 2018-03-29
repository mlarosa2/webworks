import { Injectable } from '@angular/core';
import * as monaco from '../assets/standalone/index.js'; // monaco

@Injectable()
export class MonacoService {

  constructor() { }

  create(ele: Element): any {
    // needa cast
    return monaco.editor.create(<HTMLElement>ele);
  }

  destroy(instance: any): void {
    instance = null;
  }

  getValue(instance: any): string {
    return instance.getValue();
  }

  setValue(instance: any, text: string): void {
    instance.setValue(text);
  }
}
