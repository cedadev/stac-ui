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
  assets: Asset[];
  collection: Collection;
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
  type: string;
  options?: [];
  value?: any;
};

export type Context = {
  returned: number;
  matched?: number;
  collections?: [];
};

export type PaginationType = {
  current: string;
  next?: string;
  previous?: string;
};
