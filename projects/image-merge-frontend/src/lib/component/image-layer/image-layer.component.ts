import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {LayerImage} from '../../models/layer-object.interface';

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
    @Input()
    public activeHoverIcon: LayerImage | null;

    @Output()
    public activeHoverIconChange: EventEmitter<LayerImage | null> = new EventEmitter<LayerImage | null>();
    @Output()
    public iconClick: EventEmitter<LayerImage> = new EventEmitter<LayerImage>();

    constructor(public config: ConfigService) {
    }

    ngOnInit(): void {
    }

    public getAnimatedClass(subLayerImage): object {

        const classMap = {
            animate__animated: true,
            animate__fadeIn: false,
            animate__fadeOut: false
        };

        if (this.config.getShowIcons() && this.layerImage.active && subLayerImage.icon) {
            classMap.animate__fadeIn = true;
        } else {
            classMap.animate__fadeOut = true;
        }

        return classMap;
    }
}
