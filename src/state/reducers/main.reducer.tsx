import { MainState } from "../app.types";
import createReducer from './createReducer';
import {
  setAssetListType,
  setItemListType,
  setCollectionListType,
  setAssetType,
  unsetAssetType,
  setItemType,
  unsetItemType,
  setCollectionType,
  unsetCollectionType,
  setSearchFacetsType,
  setSearchFacetType,
  setBboxFacetType,
  setDatetimeFacetType,
  setQueryType,
  setContextType,
  setListErrorType,
  setPageType,
  setFacetsPayload,
  setFacetPayload,
  setAssetListPayload,
  setItemListPayload,
  setCollectionListPayload,
  setAssetPayload,
  setItemPayload,
  setCollectionPayload,
  setQueryPayload,
  setContextPayload,
  setListErrorPayload,
  setPagePayload,
} from "../actions/actions.types";

export const initialState: MainState = {
  collectionList: [],
  searchFacets: [],
  bboxFacet: {
    northBbox: '',
    eastBbox: '',
    southBbox: '',
    westBbox: '',
  },
  datetimeFacet: {
    startTime: null,
    endTime: null
  },
  query: '',
  page: 1,
  listError: false,
};

export function setAssetList(
  state: MainState,
  payload: setAssetListPayload
): MainState {
  return {
    ...state,
    assetList: payload.assetList,
  };
}

export function unsetAssetList(
  state: MainState,
): MainState {
  return {
    ...state,
    assetList: undefined,
  };
}

export function setItemList(
  state: MainState,
  payload: setItemListPayload
): MainState {
  return {
    ...state,
    itemList: payload.itemList,
  };
}

export function unsetItemList(
  state: MainState,
): MainState {
  return {
    ...state,
    itemList: undefined,
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

export function setAsset(
  state: MainState,
  payload: setAssetPayload
): MainState {
  return {
    ...state,
    asset: payload.asset,
  };
}

export function unsetAsset(
  state: MainState,
): MainState {
  return {
    ...state,
    asset: undefined,
  };
}

export function setItem(
  state: MainState,
  payload: setItemPayload
): MainState {
  return {
    ...state,
    item: payload.item,
  };
}

export function unsetItem(
  state: MainState,
): MainState {
  return {
    ...state,
    item: undefined,
  };
}

export function setCollection(
  state: MainState,
  payload: setCollectionPayload
): MainState {
  return {
    ...state,
    collection: payload.collection,
  };
}

export function unsetCollection(
  state: MainState,
): MainState {
  return {
    ...state,
    collection: undefined,
  };
}

export function setSearchFacets(
  state: MainState,
  payload: setFacetsPayload
): MainState {
  return {
    ...state,
    searchFacets: payload.searchFacets,
  };
}

export function setSearchFacet(
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
  return {
    ...state,
    datetimeFacet: {
      ...state.datetimeFacet,
      [payload.id]: payload.value,
    }
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

export function setListError(
  state: MainState,
  payload: setListErrorPayload,
): MainState {
  return {
    ...state,
    listError: payload.hasError,
    }
}


const MainReducer = createReducer(initialState, {
  [setAssetListType]: setAssetList,
  [setItemListType]: setItemList,
  [setCollectionListType]: setCollectionList,
  [setAssetType]: setAsset,
  [unsetAssetType]: unsetAsset,
  [setItemType]: setItem,
  [unsetItemType]: unsetItem,
  [setCollectionType]: setCollection,
  [unsetCollectionType]: unsetCollection,
  [setSearchFacetsType]: setSearchFacets,
  [setSearchFacetType]: setSearchFacet,
  [setBboxFacetType]: setBboxFacet,
  [setDatetimeFacetType]: setDatetimeFacet,
  [setQueryType]: setQuery,
  [setContextType]: setContext,
  [setPageType]: setPage,
  [setListErrorType]: setListError,
})

export default MainReducer;
