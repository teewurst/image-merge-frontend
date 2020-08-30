import {Component, Input, OnInit} from '@angular/core';
import {Icon} from 'projects/image-merge-frontend/src/lib/models/layer-object.interface';

@Component({
  selector: 'lib-image-icon',
  templateUrl: './image-icon.component.html',
  styleUrls: ['./image-icon.component.less']
})
export class ImageIconComponent implements OnInit {

  @Input()
  public icon: Icon;
  @Input()
  public ratio: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
