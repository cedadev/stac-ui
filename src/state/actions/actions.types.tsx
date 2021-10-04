import { Facet, Item, Collection, Context } from "../../types";
export const setItemListType = 'set_item_list';
export const setCollectionListType = 'set_collection_list';
export const selectItemType = 'select_item';
export const deselectItemType = 'deselect_item';
export const setCollectionType = 'set_collection';
export const unsetCollectionType = 'unset_collection';
export const setSearchFacetsType = 'set_search_facets';
export const updateSearchFacetsType = 'update_search_facets';
export const setSearchFacetValueType = 'set_search_facet_value';
export const setBboxFacetType = 'set_bbox_facet';
export const setDatetimeFacetType = 'set_datetime_facet';
export const setQueryType = 'set_query';
export const setContextType = 'set_context';
export const setLimitType = 'set_limit';
export const setPageType = 'set_page';
export const updateItemListType = 'update_item_list';
export const setItemListLoadingType = 'set_item_list_loading';
export const setItemListErrorType = 'set_item_list_error';


export interface setItemListPayload {
  itemList: Item[];
}

export interface setCollectionListPayload {
  collectionList: Collection[];
}

export interface selectItemPayload {
  item: Item;
}

export interface setCollectionPayload {
  collection: Collection;
}

export interface setQueryPayload {
  query: string;
}

export interface setSearchFacetsPayload {
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

export interface setItemListLoadingPayload {
  isLoading: boolean;
}

export interface setItemListErrorPayload {
  hasError: boolean;
}