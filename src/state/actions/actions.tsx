import {
    setItemListType,
    setCollectionListType,
    selectItemType,
    deselectItemType,
    setSearchFacetsType,
    updateSearchFacetsType,
    setSearchFacetValueType,
    setDatetimeFacetType,
    setBboxFacetType,
    setQueryType,
    unsetCollectionType,
    setCollectionType,
    setContextType,
    setLimitType,
    setPageType,
    updateItemListType,
    setItemListLoadingType,
    setItemListErrorType,
    setItemListPayload,
    setCollectionListPayload,
    selectItemPayload,
    setSearchFacetsPayload,
    setFacetPayload,
    setQueryPayload,
    setCollectionPayload,
    setContextPayload,
    setLimitPayload,
    setPagePayload,
    setItemListLoadingPayload,
    setItemListErrorPayload,
  } from './actions.types';
  import { ActionType } from '../app.types';
  import { Facet, Item, Collection, Context } from '../../types';
  
  
  export const setItemList = (
    itemList: Item[]
  ): ActionType<setItemListPayload> => ({
    type: setItemListType,
    payload: {
      itemList,
    },
  });
  
  export const setCollectionList = (
    collectionList: Collection[]
  ): ActionType<setCollectionListPayload> => ({
    type: setCollectionListType,
    payload: {
      collectionList,
    },
  });
  
  export const selectItem = (
    item: Item
  ): ActionType<selectItemPayload> => ({
    type: selectItemType,
    payload: {
      item,
    },
  });
  
  export function deselectItem() {
    return { type: deselectItemType }
  }

  export const setCollection = (
    collection: Collection
  ): ActionType<setCollectionPayload> => ({
    type: setCollectionType,
    payload: {
      collection,
    },
  });
  
  export function unsetCollection() {
    return { type: unsetCollectionType }
  }

  export const updateSearchFacets = (
    context: Context
  ): ActionType<setContextPayload> => ({
    type: updateSearchFacetsType,
    payload: {
      context,
    },
});

  export const setSearchFacets = (
    searchFacets: Facet[]
  ): ActionType<setSearchFacetsPayload> => ({
    type: setSearchFacetsType,
    payload: {
      searchFacets,
    },
  });

  export const setSearchFacetValue = (
    id: string,
    value: any,
  ): ActionType<setFacetPayload> => ({
    type: setSearchFacetValueType,
    payload: {
      id,
      value
    },
  });

  export const setBboxFacet = (
    id: string,
    value: any,
  ): ActionType<setFacetPayload> => ({
    type: setBboxFacetType,
    payload: {
      id,
      value
    },
  });

  export const setDatetimeFacet = (
    id: string,
    value: Date|null,
  ): ActionType<setFacetPayload> => ({
    type: setDatetimeFacetType,
    payload: {
      id,
      value
    },
  });

  export const setQuery = (
    query: string
  ): ActionType<setQueryPayload> => ({
    type: setQueryType,
    payload: {
      query,
    },
  });

  export const setContext = (
    context: Context
  ): ActionType<setContextPayload> => ({
    type: setContextType,
    payload: {
      context,
    },
  });

  export const setLimit = (
    limit: number
  ): ActionType<setLimitPayload> => ({
    type: setLimitType,
    payload: {
      limit,
    },
  });

  export const setPage = (
    page: number
  ): ActionType<setPagePayload> => ({
    type: setPageType,
    payload: {
      page,
    },
  });

  export function updateItemList() {
    return { type: updateItemListType }
  }

  export const setItemListLoading = (
    isLoading: boolean
  ): ActionType<setItemListLoadingPayload> => ({
    type: setItemListLoadingType,
    payload: {
      isLoading,
    },
  });  
  
  export const setItemListError = (
    hasError: boolean
  ): ActionType<setItemListErrorPayload> => ({
    type: setItemListErrorType,
    payload: {
      hasError,
    },
  });