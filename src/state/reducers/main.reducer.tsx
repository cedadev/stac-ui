import { MainState } from "../app.types";
import createReducer from './createReducer';
import {
  setLoadingType,
  setItemListType,
  setCollectionListType,
  selectItemType,
  deselectItemType,
  setCollectionType,
  unsetCollectionType,
  setAvailableFacetsType,
  setSelectedFacetType,
  setBboxFacetType,
  setDatetimeFacetType,
  setQueryType,
  setPageType,
  setMaxPageType,
  setPageUrlType,
  setLoadingPayload,
  setAvailableFacetsPayload,
  setSelectedFacetPayload,
  setItemListPayload,
  setCollectionListPayload,
  selectItemPayload,
  setCollectionPayload,
  setQueryPayload,
  setPagePayload,
  setPageUrlPayload,
} from "../actions/actions.types";

export const initialState: MainState = {
  itemList: [],
  collectionList: [],
  availableFacets: [],
  selectedFacets: {},
  bboxFacet: {},
  datetimeFacet: {},
  query: '',
  selectedItem: undefined,
  loading: true,
  page: undefined,
  maxPage: undefined,
  pageUrl: undefined,
};

export function setItemList(
  state: MainState,
  payload: setItemListPayload
): MainState {
  return {
    ...state,
    itemList: payload.itemList,
  };
}

export function setCollectionList(
  state: MainState,
  payload: setCollectionListPayload
): MainState {
  return {
    ...state,
    collectionList: payload.collectionList,
  };
}

export function selectItem(
  state: MainState,
  payload: selectItemPayload
): MainState {
  return {
    ...state,
    selectedItem: payload.item,
  };
}

export function setCollection(
  state: MainState,
  payload: setCollectionPayload
): MainState {
  return {
    ...state,
    selectedCollection: payload.collection,
  };
}

export function deselectItem(
  state: MainState,
): MainState {
  return {
    ...state,
    selectedItem: undefined,
  };
}

export function unsetCollection(
  state: MainState,
): MainState {
  return {
    ...state,
    selectedCollection: undefined,
  };
}

export function setAvailableFacets(
  state: MainState,
  payload: setAvailableFacetsPayload
): MainState {
  return {
    ...state,
    availableFacets: payload.availableFacets,
  };
}

export function setSelectedFacet(
  state: MainState,
  payload: setSelectedFacetPayload
): MainState {
  if (payload.facetValue) {
    return {
      ...state,
      selectedFacets: {
        ...state.selectedFacets,
        [payload.selectedFacet]: payload.facetValue,
      }
    };
  } else {
    var newState: any = state;
    delete newState.selectedFacets[payload.selectedFacet];
    return newState;
  };
  
}

export function setBboxFacet(
  state: MainState,
  payload: setSelectedFacetPayload
): MainState {
  if (payload.facetValue) {
    return {
      ...state,
      selectedFacets: {
        ...state.bboxFacet,
        [payload.selectedFacet]: payload.facetValue,
      }
    };
  } else {
    var newState: any = state;
    delete newState.bbox[payload.selectedFacet];
    return newState;
  };
  
}

export function setDatetimeFacet(
  state: MainState,
  payload: setSelectedFacetPayload
): MainState {
  if (payload.facetValue) {
    return {
      ...state,
      selectedFacets: {
        ...state.datetimeFacet,
        [payload.selectedFacet]: payload.facetValue,
      }
    };
  } else {
    var newState: any = state;
    delete newState.datetime[payload.selectedFacet];
    return newState;
  };
  
}

export function setLoading(
  state: MainState,
  payload: setLoadingPayload,
): MainState {
  return {
    ...state,
    loading: payload.loading,
  };
}

export function setQuery(
  state: MainState,
  payload: setQueryPayload,
): MainState {
  return {
    ...state,
    query: payload.query,
  };
}

export function setPage(
  state: MainState,
  payload: setPagePayload,
): MainState {
  return {
    ...state,
    page: payload.page,
  };
}

export function setMaxPage(
  state: MainState,
  payload: setPagePayload,
): MainState {
  return {
    ...state,
    maxPage: payload.page,
  };
}

export function setPageUrl(
  state: MainState,
  payload: setPageUrlPayload,
): MainState {
  return {
    ...state,
    pageUrl: payload.url,
  };
}

const MainReducer = createReducer(initialState, {
  [setItemListType]: setItemList,
  [setCollectionListType]: setCollectionList,
  [selectItemType]: selectItem,
  [deselectItemType]: deselectItem,
  [setCollectionType]: setCollection,
  [unsetCollectionType]: unsetCollection,
  [setAvailableFacetsType]: setAvailableFacets,
  [setSelectedFacetType]: setSelectedFacet,
  [setBboxFacetType]: setBboxFacet,
  [setDatetimeFacetType]: setDatetimeFacet,
  [setLoadingType]: setLoading,
  [setQueryType]: setQuery,
  [setPageType]: setPage,
  [setMaxPageType]: setMaxPage,
  [setPageUrlType]: setPageUrl,
})

export default MainReducer;