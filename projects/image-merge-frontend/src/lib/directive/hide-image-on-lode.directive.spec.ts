import { HideImageOnLodeDirective } from './hide-image-on-lode.directive';
import {ElementRef} from '@angular/core';

describe('HideImageOnLodeDirective', () => {
  it('should create an instance', () => {
    const directive = new HideImageOnLodeDirective(new ElementRef<any>(null));
    expect(directive).toBeTruthy();
  });
});
