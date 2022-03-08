import { Asset, Item, Collection, Facet, BboxFacet, DatetimeFacet, Context  } from '../types';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export interface MainState {
  assetList?: Asset[];
  itemList?: Item[];
  collectionList: Collection[];
  bboxFacet: BboxFacet;
  datetimeFacet: DatetimeFacet;
  searchFacets: Facet[];
  asset?: Asset;
  item?: Item;
  collection?: Collection;
  query: string;
  context?: Context;
  page: number;
  listError: boolean;
}

export interface StateType {
  main: MainState;
}

export interface ActionType<T> {
  type: string;
  payload: T;
}

export type ThunkResult<R> = ThunkAction<R, StateType, null, AnyAction>;
