import {Coordinates} from 'projects/image-merge-frontend/src/lib/models/Coordinates.interface';

export interface Image {
    url: string;
    size: Coordinates;
    offset: Coordinates;
    actualSize: Coordinates;
    active: boolean;
}
