export interface LayerImage {
  id: number;
  name: string;
  active: boolean;
  typeId: number;
  consistsOf: number[];
  volatileUuid?: string;
  url?: string;
  size?: LayerCoordinates;
  offset?: LayerCoordinates;
  subLayerOffset?: LayerCoordinates;
  actualSize?: LayerCoordinates;
  images?: {[key: number]: LayerImage };
  icon?: Icon;
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
