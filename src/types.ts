export type Collection = {
  id: string;
  title: string;
  description: string;
  spatial: {
    bbox: number[];
  },
  temporal: {
    interval: string[];
  },
  properties: {
    license: string;
    keywords: string[];
  };
};

export type Item = {
  id: string;
  bbox: number[];
  properties: any;
  assets: MetaAsset[];
  collection: Collection;
};

export type Asset = {
  id: string;
  bbox: number[];
  title: string;
  href: string;
  type: string;
  roles: string[];
  item: Item;
  properties: any;
};

export type MetaAsset = {
  id: string;
  bbox: number[];
  title: string;
  href: string;
  type: string;
  roles: string[];
}

export type Facet = {
  id: string;
  title: string;
  type: string;
  options?: [];
  value?: any;
};

export type Context = {
  limit?: number;
  matched?: number;
  collections?: [];
};

export type BboxFacet = {
  northBbox: string;
  eastBbox: string;
  southBbox: string;
  westBbox: string;
};

export type DatetimeFacet = {
  startTime: Date|null;
  endTime: Date|null;
};

export type Error = {
  hasError: boolean;
  type?: string;
  string?: string;
};
