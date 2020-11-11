export interface LayerImage {
  id: number;
  name: string;
  active: boolean;
  typeId: number;
  consistsOf: number[];
  volatileUuid?: string;
  currentVariant?: number;
  variants?: Variant[];
  preview?: string;
  size?: LayerCoordinates;
  offset?: LayerCoordinates;
  subLayerOffset?: LayerCoordinates;
  actualSize?: LayerCoordinates;
  images?: {[key: number]: LayerImage };
  icon?: Icon;
}

export interface Variant {
  name: string;
  key: string;
  url: string;
  preview: string;
}

export interface LayerCoordinates {
  x: number;
  y: number;
}

export interface Icon {
  offset: LayerCoordinates;
  display: string | number;
  shortMessage?: string;
  tooltip?: string;
}
