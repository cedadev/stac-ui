import { Asset, Item, Collection, Facet, Context } from "../../types";
export const setAssetListType = 'set_asset_list';
export const unsetAssetListType = 'unset_asset_list';
export const updateAssetListType = 'update_asset_list';
export const setItemListType = 'set_item_list';
export const unsetItemListType = 'unset_item_list';
export const updateItemListType = 'update_item_list';
export const setCollectionListType = 'set_collection_list';
export const setAssetType = 'set_asset';
export const unsetAssetType = 'unset_asset';
export const setItemType = 'set_item';
export const unsetItemType = 'unset_item';
export const setCollectionType = 'set_collection';
export const unsetCollectionType = 'unset_collection';
export const setSearchFacetsType = 'set_search_facets';
export const updateSearchFacetsType = 'update_search_facets';
export const setSearchFacetType = 'set_search_facet';
export const setBboxFacetType = 'set_bbox_facet';
export const setDatetimeFacetType = 'set_datetime_facet';
export const setQueryType = 'set_query';
export const setContextType = 'set_context';
export const setLimitType = 'set_limit';
export const setPageType = 'set_page';
export const setListErrorType = 'set_list_error';


export interface setAssetListPayload {
  assetList: Asset[];
}

export interface setItemListPayload {
  itemList: Item[];
}

export interface setCollectionListPayload {
  collectionList: Collection[];
}

export interface setAssetPayload {
  asset: Asset;
}

export interface setItemPayload {
  item: Item;
}

export interface setCollectionPayload {
  collection: Collection;
}

export interface setQueryPayload {
  query: string;
}

export interface setFacetsPayload {
  searchFacets: Facet[];
}

export interface setFacetPayload {
  id: string;
  value: any;
}

export interface setContextPayload {
  context: Context;
}

export interface setLimitPayload {
  limit: number;
}

export interface setPagePayload {
  page: number;
}

export interface setListErrorPayload {
  hasError: boolean;
}