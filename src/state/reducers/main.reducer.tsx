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
  setContextType,
  setLimitType,
  setLoadingPayload,
  setAvailableFacetsPayload,
  setSelectedFacetPayload,
  setItemListPayload,
  setCollectionListPayload,
  selectItemPayload,
  setCollectionPayload,
  setQueryPayload,
  setContextPayload,
  setLimitPayload,
} from "../actions/actions.types";

export const initialState: MainState = {
  itemList: [],
  collectionList: [],
  availableFacets: [],
  selectedFacets: {},
  bboxFacet: {},
  datetimeFacet: {},
  context: undefined,
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
      bboxFacet: {
        ...state.bboxFacet,
        [payload.selectedFacet]: payload.facetValue,
      }
    };
  } else {
    var newState: any = state;
    delete newState.bboxFacet[payload.selectedFacet];
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
      datetimeFacet: {
        ...state.datetimeFacet,
        [payload.selectedFacet]: payload.facetValue,
      }
    };
  } else {
    var newState: any = state;
    delete newState.datetimeFacet[payload.selectedFacet];
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

export function setContext(
  state: MainState,
  payload: setContextPayload,
): MainState {
  return {
    ...state,
    context: payload.context,
  };
}

export function setLimit(
  state: MainState,
  payload: setLimitPayload,
): MainState {
  return {
    ...state,
    limit: payload.limit,
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
  [setContextType]: setContext,
  [setLimitType]: setLimit,
})

export default MainReducer;