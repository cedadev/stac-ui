import {
    setItemListType,
    setCollectionListType,
    selectItemType,
    deselectItemType,
    setLoadingType,
    setAvailableFacetsType,
    setSelectedFacetType,
    setQueryType,
    deselectCollectionType,
    selectCollectionType,
    setItemListPayload,
    setCollectionListPayload,
    selectItemPayload,
    setLoadingPayload,
    setAvailableFacetsPayload,
    setSelectedFacetPayload,
    setQueryPayload,
    selectCollectionPayload,
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

  export const selectCollection = (
    collection: Collection
  ): ActionType<selectCollectionPayload> => ({
    type: selectCollectionType,
    payload: {
      collection,
    },
  });
  
  export function deselectCollection() {
    return { type: deselectCollectionType }
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