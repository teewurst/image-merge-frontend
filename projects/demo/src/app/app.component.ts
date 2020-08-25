import {Component} from '@angular/core';
import {LayerObject} from 'projects/image-merge-frontend/src/lib/models/LayerObject.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'demo';

    public activeLayer = 1;
    public activeImage = 0;
    public layerObjects: LayerObject[] =
        [
            {
                images: [
                    {
                        url: '/assets/body.png',
                        size: {
                            x: '128px',
                            y: '128px'
                        },
                        offset: {
                            x: '0px',
                            y: '0px'
                        },
                        actualSize: {
                            x: '128px',
                            y: '128px'
                        },
                        active: false
                    },
                    {
                        url: '/assets/eyes.png',
                        size: {
                            x: '128px',
                            y: '128px'
                        },
                        offset: {
                            x: '0px',
                            y: '0px'
                        },
                        actualSize: {
                            x: '128px',
                            y: '128px'
                        },
                        active: false
                    }
                ]
            },
            {
                images: [
                    {
                        url: '/assets/mouth.png',
                        size: {
                            x: '128px',
                            y: '128px'
                        },
                        offset: {
                            x: '0px',
                            y: '0px'
                        },
                        actualSize: {
                            x: '128px',
                            y: '128px'
                        },
                        active: true
                    }
                ]
            },
        ];

    public switchActive(): void {
        this.layerObjects[this.activeLayer].images[this.activeImage].active = false;

        if (++this.activeImage < this.layerObjects[this.activeLayer].images.length) {
            this.layerObjects[this.activeLayer].images[this.activeImage].active = true;
            return;
        }
        this.activeImage = 0;

        if (++this.activeLayer < this.layerObjects.length) {
            this.layerObjects[this.activeLayer].images[this.activeImage].active = true;
            return;
        }

        this.activeLayer = 0;
        this.layerObjects[this.activeLayer].images[this.activeImage].active = true;
    }

    public randomizeSize(): void {
        const number5 = Math.random() * 30;
        const number4 = Math.random() * 30;
        const number3 = Math.random() * 30;
        const number2 = Math.random() * 30;
        const number1 = Math.random() * 30;
        const number0 = Math.random() * 30;
        this.layerObjects[0].images[0].size.x = (128 - number5) + 'px';
        this.layerObjects[0].images[0].size.y = (128 - number4) + 'px';
        this.layerObjects[0].images[1].size.x = (128 - number3) + 'px';
        this.layerObjects[0].images[1].size.y = (128 - number2) + 'px';
        this.layerObjects[1].images[0].size.x = (128 - number1) + 'px';
        this.layerObjects[1].images[0].size.y = (128 - number0) + 'px';

        this.layerObjects[0].images[0].offset.x = (Math.random() * number5) + 'px';
        this.layerObjects[0].images[0].offset.y = (Math.random() * number4) + 'px';
        this.layerObjects[0].images[1].offset.x = (Math.random() * number3) + 'px';
        this.layerObjects[0].images[1].offset.y = (Math.random() * number2) + 'px';
        this.layerObjects[1].images[0].offset.x = (Math.random() * number1) + 'px';
        this.layerObjects[1].images[0].offset.y = (Math.random() * number0) + 'px';
    }
}
