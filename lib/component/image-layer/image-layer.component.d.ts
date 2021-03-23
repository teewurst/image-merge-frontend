import { OnChanges, SimpleChanges } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { LayerCoordinates, LayerImage } from '../../models/layer-object.interface';
export declare class ImageLayerComponent implements OnChanges {
    config: ConfigService;
    /** current Layer image */
    layerImage: LayerImage;
    /** Offset by which the parent moves its children */
    parentLayerOffset: LayerCoordinates;
    /** Ratio by which the image is resized to fit available space */
    ratio: number;
    constructor(config: ConfigService);
    /** prevent so valueKey pipe to sort any keys */
    doNotSort(): number;
    /** listen to changes of layer image => it may has an unset currentVariant */
    ngOnChanges(changes: SimpleChanges): void;
    /** check if val is a number */
    isNumeric(val: number): boolean;
}
