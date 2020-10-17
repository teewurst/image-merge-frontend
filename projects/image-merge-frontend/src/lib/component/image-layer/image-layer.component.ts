import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {LayerCoordinates, LayerImage} from '../../models/layer-object.interface';


@Component({
    selector: 'lib-image-layer',
    templateUrl: './image-layer.component.html',
    styleUrls: ['./image-layer.component.less']
})
export class ImageLayerComponent implements OnInit {
    @Input()
    public layerImage: LayerImage;
    @Input()
    public parentLayerOffset: LayerCoordinates = {x: 0, y: 0};
    @Input()
    public ratio: number;

    @Output()
    public iconClick: EventEmitter<LayerImage> = new EventEmitter<LayerImage>();

    constructor(public config: ConfigService) {
    }

    ngOnInit(): void {
    }

    public doNotSort(): number {
        return 0;
    }
}
