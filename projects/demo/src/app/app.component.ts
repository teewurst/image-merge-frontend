import {Component, OnInit} from '@angular/core';
import {LayerImage} from '../../../image-merge-frontend/src/lib/models/layer-object.interface';
import {layerImageMock} from './app.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    title = 'demo';

    fullWidth = false;
    public layerImage: LayerImage;
    public activeLayerImage: LayerImage;
    public resetLayerImage: string;

    public ngOnInit(): void {
        this.layerImage = layerImageMock;
        this.resetLayerImage = JSON.stringify(this.layerImage);
    }

    public randomizeSize(): void {
        const number5 = Math.random() * 50;
        const number4 = Math.random() * 150;
        const number3 = Math.random() * 50;
        const number2 = Math.random() * 150;
        const number1 = Math.random() * 50;
        const number0 = Math.random() * 150;
        this.layerImage.images[0].size.x = (500 - number5);
        this.layerImage.images[0].size.y = (500 - number4);
        this.layerImage.images[1].images[1].size.x = (500 - number3);
        this.layerImage.images[1].images[1].size.y = (500 - number2);
        this.layerImage.images[1].images[0].size.x = (500 - number1);
        this.layerImage.images[1].images[0].size.y = (500 - number0);

        this.layerImage.images[0].offset.x = (Math.random() * number5 + 50);
        this.layerImage.images[0].offset.y = (Math.random() * number4 + 150);
        this.layerImage.images[1].images[1].offset.x = (Math.random() * number3 + 50);
        this.layerImage.images[1].images[1].offset.y = (Math.random() * number2 + 150);
        this.layerImage.images[1].images[0].offset.x = (Math.random() * number1 + 50);
        this.layerImage.images[1].images[0].offset.y = (Math.random() * number0 + 150);
    }

    public triggerResize(): void {
        this.fullWidth = !this.fullWidth;
    }

    public resetActive(): void {
        this.layerImage = JSON.parse(this.resetLayerImage);
        this.activeLayerImage = this.layerImage;
    }

    public isObject(item): boolean {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    public mergeDeep(target, ...sources): any {
        if (!sources.length) {
            return target;
        }

        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {

                if (!source.hasOwnProperty(key)) {
                    continue;
                }

                if (this.isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, {[key]: {}});
                    }
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    }

    public setActiveLayerImage($event: LayerImage): void {

        this.activeLayerImage = $event;
    }
}
