import { Item, Facet, Collection, Context, BboxFacet, DatetimeFacet } from '../types';
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
  query: string;
  context?: Context;
  page: number;
  itemListLoading: boolean;
  itemListError: boolean;
}

export interface StateType {
  main: MainState;
}

export interface ActionType<T> {
  type: string;
  payload: T;
}

export type ThunkResult<R> = ThunkAction<R, StateType, null, AnyAction>;
