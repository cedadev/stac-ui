import { MainState } from "../app.types";
import createReducer from './createReducer';
import {
  setLoadingType,
  setItemListType,
  selectItemType,
  deselectItemType,
  selectCollectionType,
  deselectCollectionType,
  setAvailableFacetsType,
  setSelectedFacetsType,
  setQueryType,
  setLoadingPayload,
  setAvailableFacetsPayload,
  setSelectedFacetsPayload,
  setItemListPayload,
  selectItemPayload,
  selectCollectionPayload,
  setQueryPayload,
} from "../actions/actions.types";

export const initialState: MainState = {
  itemList: [],
  availableFacets: [],
  selectedFacets: [],
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

export function setSelectedFacets(
  state: MainState,
  payload: setSelectedFacetsPayload
): MainState {
  return {
    ...state,
    selectedFacets: payload.selectedFacets,
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
  [selectItemType]: selectItem,
  [deselectItemType]: deselectItem,
  [selectCollectionType]: selectCollection,
  [deselectCollectionType]: deselectCollection,
  [setAvailableFacetsType]: setAvailableFacets,
  [setSelectedFacetsType]: setSelectedFacets,
  [setLoadingType]: setLoading,
  [setQueryType]: setQuery,
})

export default MainReducer;