import {
    setAssetListType,
    unsetAssetListType,
    updateAssetListType,
    setItemListType,
    unsetItemListType,
    setCollectionListType,
    setAssetType,
    unsetAssetType,
    setItemType,
    unsetItemType,
    setSearchFacetsType,
    updateSearchFacetsType,
    setSearchFacetType,
    setDatetimeFacetType,
    setBboxFacetType,
    setQueryType,
    unsetCollectionType,
    setCollectionType,
    setContextType,
    setLimitType,
    setPageType,
    updateItemListType,
    setListErrorType,
    setAssetListPayload,
    setItemListPayload,
    setCollectionListPayload,
    setAssetPayload,
    setItemPayload,
    setFacetsPayload,
    setFacetPayload,
    setQueryPayload,
    setCollectionPayload,
    setContextPayload,
    setLimitPayload,
    setPagePayload,
    setListErrorPayload,
  } from './actions.types';
  import { ActionType } from '../app.types';
  import { Asset, Item, Collection, Facet, Context } from '../../types';


  export const setAssetList = (
    assetList: Asset[]
  ): ActionType<setAssetListPayload> => ({
    type: setAssetListType,
    payload: {
      assetList,
    },
  });

  export function unsetAssetList() {
    return { type: unsetAssetListType }
  };

  export function updateAssetList() {
    return { type: updateAssetListType }
  };

  export const setItemList = (
    itemList: Item[]
  ): ActionType<setItemListPayload> => ({
    type: setItemListType,
    payload: {
      itemList,
    },
  });

  export function unsetItemList() {
    return { type: unsetItemListType }
  };

  export function updateItemList() {
    return { type: updateItemListType }
  };
  
  export const setCollectionList = (
    collectionList: Collection[]
  ): ActionType<setCollectionListPayload> => ({
    type: setCollectionListType,
    payload: {
      collectionList,
    },
  });
  
  export const setAsset = (
    asset: Asset
  ): ActionType<setAssetPayload> => ({
    type: setAssetType,
    payload: {
      asset,
    },
  });
  
  export function unsetAsset() {
    return { type: unsetAssetType }
  };

  export const setItem = (
    item: Item
  ): ActionType<setItemPayload> => ({
    type: setItemType,
    payload: {
      item,
    },
  });
  
  export function unsetItem() {
    return { type: unsetItemType }
  };

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
  ): ActionType<setFacetsPayload> => ({
    type: setSearchFacetsType,
    payload: {
      searchFacets,
    },
  });

  export const setSearchFacet = (
    id: string,
    value: any,
  ): ActionType<setFacetPayload> => ({
    type: setSearchFacetType,
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
  
  export const setListError = (
    hasError: boolean
  ): ActionType<setListErrorPayload> => ({
    type: setListErrorType,
    payload: {
      hasError,
    },
  });
