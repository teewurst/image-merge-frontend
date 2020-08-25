import {Component, Input, OnInit} from '@angular/core';
import {LayerObject} from './models/LayerObject.model';

@Component({
  selector: 'lib-image-merge-frontend',
  templateUrl: './image-merge-frontend.component.html',
  styleUrls: ['./image-merge-frontend.component.less']
})
export class ImageMergeFrontendComponent implements OnInit {

  @Input() public layerObjects: LayerObject[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
