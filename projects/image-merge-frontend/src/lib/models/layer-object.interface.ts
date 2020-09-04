export interface LayerImage {
  id: number;
  name: string;
  active: boolean;
  url?: string;
  size?: Coordinates;
  offset?: Coordinates;
  actualSize?: Coordinates;
  images?: LayerImage[];
  icon?: Icon;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Icon {
  offset: Coordinates;
  display: string | number;
  shortMessage?: string;
  tooltip?: string;
}
