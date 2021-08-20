import { Facet, Item, Collection, Context } from "../../types";
export const setItemListType = 'set_item_list';
export const setCollectionListType = 'set_collection_list';
export const selectItemType = 'select_item';
export const deselectItemType = 'deselect_item';
export const setCollectionType = 'set_collection';
export const unsetCollectionType = 'unset_collection';
export const setAvailableFacetsType = 'set_available_facets';
export const setSelectedFacetType = 'set_selected_facet';
export const setBboxFacetType = 'set_bbox_facet';
export const setDatetimeFacetType = 'set_datetime_facet';
export const setLoadingType = 'set_loading';
export const setQueryType = 'set_query';
export const setContextType = 'set_context';
export const setLimitType = 'set_limit';


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

export interface setLoadingPayload {
  loading: boolean;
}

export interface setQueryPayload {
  query: string;
}

export interface setAvailableFacetsPayload {
  availableFacets: Facet[];
}

export interface setSelectedFacetPayload {
  selectedFacet: string;
  facetValue: any;
}

export interface setContextPayload {
  context: Context;
}

export interface setLimitPayload {
  limit: number;
}
