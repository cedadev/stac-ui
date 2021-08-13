import {
    setItemListType,
    setCollectionListType,
    selectItemType,
    deselectItemType,
    setLoadingType,
    setAvailableFacetsType,
    setSelectedFacetType,
    setQueryType,
    unsetCollectionType,
    setCollectionType,
    setPageType,
    setMaxPageType,
    setPageUrlType,
    setItemListPayload,
    setCollectionListPayload,
    selectItemPayload,
    setLoadingPayload,
    setAvailableFacetsPayload,
    setSelectedFacetPayload,
    setQueryPayload,
    setCollectionPayload,
    setPagePayload,
    setPageUrlPayload,
  } from './actions.types';
  import { ActionType } from '../app.types';
  import { Facet, Item, Collection } from '../../types';
  
  
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

  export const setAvailableFacets = (
    availableFacets: Facet[]
  ): ActionType<setAvailableFacetsPayload> => ({
    type: setAvailableFacetsType,
    payload: {
      availableFacets,
    },
  });

  export const setSelectedFacet = (
    selectedFacet: string,
    facetValue: any,
  ): ActionType<setSelectedFacetPayload> => ({
    type: setSelectedFacetType,
    payload: {
      selectedFacet,
      facetValue
    },
  });

  export const setBboxFacet = (
    selectedFacet: string,
    facetValue: any,
  ): ActionType<setSelectedFacetPayload> => ({
    type: setSelectedFacetType,
    payload: {
      selectedFacet,
      facetValue
    },
  });

  export const setDatetimeFacet = (
    selectedFacet: string,
    facetValue: any,
  ): ActionType<setSelectedFacetPayload> => ({
    type: setSelectedFacetType,
    payload: {
      selectedFacet,
      facetValue
    },
  });

  export const setLoading = (
    loading: boolean
  ): ActionType<setLoadingPayload> => ({
    type: setLoadingType,
    payload: {
      loading,
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

  export const setPage = (
    page: number
  ): ActionType<setPagePayload> => ({
    type: setPageType,
    payload: {
      page,
    },
  });

  export const setMaxPage = (
    page: number
  ): ActionType<setPagePayload> => ({
    type: setMaxPageType,
    payload: {
      page,
    },
  });

  export const setPageUrl = (
    url: string
  ): ActionType<setPageUrlPayload> => ({
    type: setPageUrlType,
    payload: {
      url,
    },
  });
