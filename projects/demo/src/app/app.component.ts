import {Component} from '@angular/core';
import {LayerImage} from 'projects/image-merge-frontend/src/lib/models/layer-object.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'demo';

    fullWidth = false;
    public layerImage: LayerImage = {
        volatileUuid: '',
        typeId: 2,
        consistsOf: [],
        id: 0,
        name: 'Scene Face',
        active: true,
        images: [
            {
                volatileUuid: '',
                typeId: 2,
                consistsOf: [],
                id: 1,
                name: 'Body Background',
                url: '/assets/body.png',
                size: {
                    x: 500,
                    y: 500
                },
                offset: {
                    x: 50,
                    y: 150
                },
                actualSize: {
                    x: 256,
                    y: 256
                },
                icon: {
                    offset: {
                        x: 150,
                        y: 200
                    },
                    display: 'Body',
                },
                active: false,
            },
            {
                volatileUuid: '',
                typeId: 2,
                consistsOf: [],
                id: 2,
                name: 'Face',
                active: false,
                icon: {
                    offset: {
                        x: 430,
                        y: 530
                    },
                    display: 'Face',
                },
                images: [
                    {
                        volatileUuid: '',
                        typeId: 2,
                        consistsOf: [],
                        url: '/assets/mouth.png',
                        id: 0,
                        name: 'Mouth',
                        size: {
                            x: 500,
                            y: 500
                        },
                        offset: {
                            x: 50,
                            y: 150
                        },
                        actualSize: {
                            x: 256,
                            y: 256
                        },
                        icon: {
                            offset: {
                                x: 400,
                                y: 500
                            },
                            display: 'Mouth',
                        },
                        active: false
                    },
                    {
                        volatileUuid: '',
                        typeId: 2,
                        consistsOf: [],
                        url: '/assets/eyes.png',
                        id: 1,
                        name: 'eyes',
                        size: {
                            x: 500,
                            y: 500
                        },
                        offset: {
                            x: 50,
                            y: 150
                        },
                        actualSize: {
                            x: 256,
                            y: 256
                        },
                        icon: {
                            offset: {
                                x: 125,
                                y: 300
                            },
                            display: 'Eyes',
                        },
                        active: false
                    }
                ]
            },
        ]
    };

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
}
