import {Component} from '@angular/core';
import {LayerObject} from 'projects/image-merge-frontend/src/lib/models/LayerObject.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'demo';

    fullWidth = false;
    public activeLayer = 1;
    public activeImage = 0;
    public layerObjects: LayerObject[] =
        [
            {
                images: [
                    {
                        url: '/assets/body.png',
                        size: {
                            x: 256,
                            y: 256
                        },
                        offset: {
                            x: 0,
                            y: 0
                        },
                        actualSize: {
                            x: 256,
                            y: 256
                        },
                        active: false
                    },
                    {
                        url: '/assets/eyes.png',
                        size: {
                            x: 256,
                            y: 256
                        },
                        offset: {
                            x: 0,
                            y: 0
                        },
                        actualSize: {
                            x: 256,
                            y: 256
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
                            x: 256,
                            y: 256
                        },
                        offset: {
                            x: 0,
                            y: 0
                        },
                        actualSize: {
                            x: 256,
                            y: 256
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
        const number5 = Math.random() * 50;
        const number4 = Math.random() * 50;
        const number3 = Math.random() * 50;
        const number2 = Math.random() * 50;
        const number1 = Math.random() * 50;
        const number0 = Math.random() * 50;
        this.layerObjects[0].images[0].size.x = (256 - number5);
        this.layerObjects[0].images[0].size.y = (256 - number4);
        this.layerObjects[0].images[1].size.x = (256 - number3);
        this.layerObjects[0].images[1].size.y = (256 - number2);
        this.layerObjects[1].images[0].size.x = (256 - number1);
        this.layerObjects[1].images[0].size.y = (256 - number0);

        this.layerObjects[0].images[0].offset.x = (Math.random() * number5);
        this.layerObjects[0].images[0].offset.y = (Math.random() * number4);
        this.layerObjects[0].images[1].offset.x = (Math.random() * number3);
        this.layerObjects[0].images[1].offset.y = (Math.random() * number2);
        this.layerObjects[1].images[0].offset.x = (Math.random() * number1);
        this.layerObjects[1].images[0].offset.y = (Math.random() * number0);
    }

    public triggerResize(): void {
        this.fullWidth = !this.fullWidth;
    }
}
