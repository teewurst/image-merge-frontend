import {Coordinates} from './Coordinates.model';

export interface Image {
    url: string;
    size: Coordinates;
    offset: Coordinates;
    actualSize: Coordinates;
    active: boolean;
}
