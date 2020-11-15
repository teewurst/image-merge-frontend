export interface LayerImage {
  active: boolean;
  consistsOf: number[];
  currentVariant?: number;
  variants?: Variant[];
  size?: LayerCoordinates;
  offset?: LayerCoordinates;
  subLayerOffset?: LayerCoordinates;
  actualSize?: LayerCoordinates;
  images?: {[key: number]: LayerImage };
}

export interface Variant {
  name: string;
  colorCode: string;
  url: string;
}

export interface LayerCoordinates {
  x: number;
  y: number;
}
