import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {LayerCoordinates, LayerImage} from '../../models/layer-object.interface';


@Component({
    selector: 'lib-image-layer',
    templateUrl: './image-layer.component.html',
    styleUrls: ['./image-layer.component.less']
})
/** Display ImageLayer and render other ImageLayerComponents */
export class ImageLayerComponent implements OnChanges {
    /** current Layer image */
    @Input()
    public layerImage: LayerImage;
    /** Offset by which the parent moves its children */
    @Input()
    public parentLayerOffset: LayerCoordinates = {x: 0, y: 0};
    /** Ratio by which the image is resized to fit available space */
    @Input()
    public ratio: number;

    constructor(public config: ConfigService) {
    }

    /** prevent so valueKey pipe to sort any keys */
    public doNotSort(): number {
        return 0;
    }

    /** listen to changes of layer image => it may has an unset currentVariant */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.layerImage && changes.layerImage.currentValue !== changes.layerImage.previousValue) {
            const a: LayerImage = changes.layerImage.currentValue;
            if (a.variants && typeof a.currentVariant === 'undefined') {
                a.currentVariant = 0;
            }
        }
    }

    /** check if val is a number */
    public isNumeric(val: number): boolean {
        return typeof val === 'number';
    }
}
