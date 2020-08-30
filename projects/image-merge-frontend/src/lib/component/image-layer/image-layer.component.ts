import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LayerImage} from 'projects/image-merge-frontend/src/lib/models/layer-object.interface';

@Component({
    selector: 'lib-image-layer',
    templateUrl: './image-layer.component.html',
    styleUrls: ['./image-layer.component.less']
})
export class ImageLayerComponent implements OnInit {
    @Input()
    public layerImage: LayerImage;
    @Input()
    public ratio: number;

    @Output()
    public onIconClick: EventEmitter<LayerImage> = new EventEmitter<LayerImage>();

    constructor() {
    }

    ngOnInit(): void {
    }
}
