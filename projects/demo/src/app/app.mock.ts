import {LayerImage} from "../../../image-merge-frontend/src/lib/models/layer-object.interface";

export const layerImageMock: LayerImage = {
    volatileUuid: '',
    typeId: 2,
    consistsOf: [],
    id: 0,
    name: 'Scene Face',
    active: true,
    images: {
        1: {
            volatileUuid: '',
            typeId: 2,
            consistsOf: [],
            id: 2,
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
        2: {
            volatileUuid: '',
            typeId: 2,
            consistsOf: [],
            id: 3,
            name: 'Face',
            active: false,
            icon: {
                offset: {
                    x: 430,
                    y: 530
                },
                display: 'Face',
            },
            images: {
                3: {
                    volatileUuid: '',
                    typeId: 2,
                    consistsOf: [],
                    url: '/assets/mouth.png',
                    id: 4,
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
                4: {
                    volatileUuid: '',
                    typeId: 2,
                    consistsOf: [],
                    url: '/assets/eyes.png',
                    id: 5,
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
            }
        },
    }
};
