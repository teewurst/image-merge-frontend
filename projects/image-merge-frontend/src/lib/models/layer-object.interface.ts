export interface LayerImage {
  active: boolean;
  consistsOf: number[];
  url?: string;
  currentVariant?: number;
  variants?: Variant[];
  size?: LayerCoordinates;
  offset?: LayerCoordinates;
  subLayerOffset?: LayerCoordinates;
  actualSize?: LayerCoordinates;
  images?: {[key: number]: LayerImage };
}

export interface Variant {
  url: string;
}

export interface LayerCoordinates {
  x: number;
  y: number;
}
