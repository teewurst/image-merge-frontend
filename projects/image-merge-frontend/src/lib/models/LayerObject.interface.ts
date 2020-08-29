export interface LayerObject {
  images: Image[];
}

export interface Image {
  url: string;
  size: Coordinates;
  offset: Coordinates;
  actualSize: Coordinates;
  active: boolean;
}

export interface Coordinates {
  x: number;
  y: number;
}