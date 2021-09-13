import { MainState } from "../app.types";
import createReducer from './createReducer';
import {
  setItemListType,
  setCollectionListType,
  selectItemType,
  deselectItemType,
  setCollectionType,
  unsetCollectionType,
  setSearchFacetsType,
  setSearchFacetValueType,
  setBboxFacetType,
  setDatetimeFacetType,
  setQueryType,
  setContextType,
  setItemListLoadingType,
  setItemListErrorType,
  setPageType,
  setSearchFacetsPayload,
  setFacetPayload,
  setItemListPayload,
  setCollectionListPayload,
  selectItemPayload,
  setCollectionPayload,
  setQueryPayload,
  setContextPayload,
  setItemListLoadingPayload,
  setItemListErrorPayload,
  setPagePayload,
} from "../actions/actions.types";

export const initialState: MainState = {
  itemList: [],
  collectionList: [],
  searchFacets: [],
  bboxFacet: {
    northBbox: '',
    eastBbox: '',
    southBbox: '',
    westBbox: '',
  },
  datetimeFacet: {},
  query: '',
  page: 1,
  itemListLoading: false,
  itemListError: false,
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

export function setSearchFacets(
  state: MainState,
  payload: setSearchFacetsPayload
): MainState {
  return {
    ...state,
    searchFacets: payload.searchFacets,
  };
}

export function setSearchFacetValue(
  state: MainState,
  payload: setFacetPayload
): MainState {
  var searchFacets = state.searchFacets.filter(f => f.id !== payload.id);
  var selectedFacet = state.searchFacets.find(f => f.id === payload.id);
  if (selectedFacet !== undefined) {
    if (payload.value) {
      selectedFacet = {
        ...selectedFacet,
        value: payload.value
      };
    } else {
      delete selectedFacet.value;
    }
    searchFacets.push(selectedFacet);
    return {
      ...state,
      searchFacets: searchFacets,
    }
  } else {
    return state
  }  
}

export function setBboxFacet(
  state: MainState,
  payload: setFacetPayload
): MainState {
  return {
    ...state,
    bboxFacet: {
      ...state.bboxFacet,
      [payload.id]: payload.value,
    }
  };
}

export function setDatetimeFacet(
  state: MainState,
  payload: setFacetPayload
): MainState {
  if (payload.value) {
    return {
      ...state,
      datetimeFacet: {
        ...state.datetimeFacet,
        [payload.id]: payload.value,
      }
    };
  } else {
    var newState: any = state;
    delete newState.datetimeFacet[payload.id];
    return newState;
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

export function setPage(
  state: MainState,
  payload: setPagePayload,
): MainState {
  return {
    ...state,
    page: payload.page,
    }
}

export function setItemListLoading(
  state: MainState,
  payload: setItemListLoadingPayload,
): MainState {
  return {
    ...state,
    itemListLoading: payload.isLoading,
    }
}

export function setItemListError(
  state: MainState,
  payload: setItemListErrorPayload,
): MainState {
  return {
    ...state,
    itemListError: payload.hasError,
    }
}


const MainReducer = createReducer(initialState, {
  [setItemListType]: setItemList,
  [setCollectionListType]: setCollectionList,
  [selectItemType]: selectItem,
  [deselectItemType]: deselectItem,
  [setCollectionType]: setCollection,
  [unsetCollectionType]: unsetCollection,
  [setSearchFacetsType]: setSearchFacets,
  [setSearchFacetValueType]: setSearchFacetValue,
  [setBboxFacetType]: setBboxFacet,
  [setDatetimeFacetType]: setDatetimeFacet,
  [setQueryType]: setQuery,
  [setContextType]: setContext,
  [setPageType]: setPage,
  [setItemListLoadingType]: setItemListLoading,
  [setItemListErrorType]: setItemListError,

})

export default MainReducer;
