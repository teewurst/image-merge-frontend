import {Inject, Injectable, InjectionToken} from '@angular/core';
import {LayerCoordinates} from '../models/layer-object.interface';

export const IMAGE_MERGE_FRONTEND_CONFIG_TOKEN: InjectionToken<ConfigService> = new InjectionToken<ConfigService>('IMAGE_MERGE_FRONTEND_CONFIG_TOKEN');

export interface ImageMergeFrontendConfigInterface {
    plainSize?: LayerCoordinates;
    showMenu?: boolean;
    showIcons?: boolean;

}

@Injectable()
export class ConfigService {
    private heightWidthRatio: number;

    constructor(@Inject(IMAGE_MERGE_FRONTEND_CONFIG_TOKEN) private config: ImageMergeFrontendConfigInterface = {}) {
        this.setConfig(config);
    }

    public setConfig(config: ImageMergeFrontendConfigInterface): void {
        this.config = config;
        this.heightWidthRatio = this.getPlainSize().y / this.getPlainSize().x;
    }

    public getPlainSize(): LayerCoordinates {
        return this.config.plainSize || {x: 500, y: 500};
    }

    public getHeightWidthRatio(): number {
        return this.heightWidthRatio || this.getPlainSize().y / this.getPlainSize().x;
    }
}
