import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LayerImage} from 'projects/image-merge-frontend/src/lib/models/layer-object.interface';
import {ConfigService} from "projects/image-merge-frontend/src/lib/services/config.service";

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
    public iconClick: EventEmitter<LayerImage> = new EventEmitter<LayerImage>();

    constructor(public config: ConfigService) {
    }

    ngOnInit(): void {
    }
}
