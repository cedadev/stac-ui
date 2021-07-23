import { MainState } from "../app.types";
import createReducer from './createReducer';
import {
  setLoadingType,
  setItemListType,
  setCollectionListType,
  selectItemType,
  deselectItemType,
  selectCollectionType,
  deselectCollectionType,
  setAvailableFacetsType,
  setSelectedFacetType,
  setQueryType,
  setLoadingPayload,
  setAvailableFacetsPayload,
  setSelectedFacetPayload,
  setItemListPayload,
  setCollectionListPayload,
  selectItemPayload,
  selectCollectionPayload,
  setQueryPayload,
} from "../actions/actions.types";

export const initialState: MainState = {
  itemList: [],
  collectionList: [],
  availableFacets: [],
  selectedFacets: {},
  query: '',
  selectedItem: undefined,
  loading: true,
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

export function selectCollection(
  state: MainState,
  payload: selectCollectionPayload
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

export function deselectCollection(
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
  let newSelectedFacets: any = state.selectedFacets;
  newSelectedFacets[payload.selectedFacet] = payload.facetValue;
  
  return {
    ...state,
    selectedFacets: newSelectedFacets,
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

const MainReducer = createReducer(initialState, {
  [setItemListType]: setItemList,
  [setCollectionListType]: setCollectionList,
  [selectItemType]: selectItem,
  [deselectItemType]: deselectItem,
  [selectCollectionType]: selectCollection,
  [deselectCollectionType]: deselectCollection,
  [setAvailableFacetsType]: setAvailableFacets,
  [setSelectedFacetType]: setSelectedFacet,
  [setLoadingType]: setLoading,
  [setQueryType]: setQuery,
})

export default MainReducer;