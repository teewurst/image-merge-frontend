import {LayerImage} from '../../../image-merge-frontend/src/lib/models/layer-object.interface';

export const layerImageMock: LayerImage = {
    consistsOf: [],
    active: true,
    images: {
        1: {
            consistsOf: [],
            variants: [
                {
                    url: '/assets/body.png'
                }
            ],
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
            active: false,
        },
        2: {
            consistsOf: [],
            active: false,
            images: {
                3: {
                    consistsOf: [],
                    variants: [
                        {
                            url: '/assets/mouth.png'
                        }
                    ],
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
                    active: false
                },
                4: {
                    consistsOf: [],
                    variants: [
                        {
                            url: '/assets/eyes.png',
                        }
                    ],
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
                    active: false
                }
            }
        },
    }
};
