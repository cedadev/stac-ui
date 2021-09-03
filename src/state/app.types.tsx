import { Item, Facet, Collection, Context, BboxFacet, DatetimeFacet, Error } from '../types';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export interface MainState {
  itemList: Item[];
  collectionList: Collection[];
  bboxFacet: BboxFacet;
  datetimeFacet: DatetimeFacet;
  searchFacets: Facet[];
  selectedItem?: Item;
  selectedCollection?: Collection;
  itemListLoading: boolean;
  query: string;
  context?: Context;
  limit?: number;
  error: Error;
}

export interface StateType {
  main: MainState;
}

export interface ActionType<T> {
  type: string;
  payload: T;
}

export type ThunkResult<R> = ThunkAction<R, StateType, null, AnyAction>;
