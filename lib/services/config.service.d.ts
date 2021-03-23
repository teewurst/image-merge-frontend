import { InjectionToken } from '@angular/core';
import { LayerCoordinates } from '../models/layer-object.interface';
export declare const IMAGE_MERGE_FRONTEND_CONFIG_TOKEN: InjectionToken<ConfigService>;
export interface ImageMergeFrontendConfigInterface {
    plainSize?: LayerCoordinates;
    showMenu?: boolean;
    showIcons?: boolean;
}
export declare class ConfigService {
    private config;
    private heightWidthRatio;
    constructor(config?: ImageMergeFrontendConfigInterface);
    setConfig(config: ImageMergeFrontendConfigInterface): void;
    getPlainSize(): LayerCoordinates;
    getHeightWidthRatio(): number;
}
