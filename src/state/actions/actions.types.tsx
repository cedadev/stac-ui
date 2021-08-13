import { Facet, Item, Collection } from "../../types";

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
export const setPageType = 'set_page';
export const setMaxPageType = 'set_max_page';
export const setPageUrlType = 'set_link_url';



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

export interface setPagePayload {
  page: number;
}

export interface setPageUrlPayload {
  url: string;
}
