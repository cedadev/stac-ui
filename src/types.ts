export type Collection = {
  id: string;
  title: string;
  description: string;
  properties:{
    license: string;
    bbox: number[];
    temporal: string[];
    keywords: string[];
    platform: string[];
    flight_number: string[];
  };
  items: Item[];
};

export type Item = {
  id: string;
  bbox: number[];
  properties:{};
  assets: Asset[];
  collection_id: string;
};

export type Asset = {
    id: string;
    title: string;
    href: string;
    type: string;
    roles: string[];
};

export type Facet = {
    id: string;
    title: string;
    value: any;
};