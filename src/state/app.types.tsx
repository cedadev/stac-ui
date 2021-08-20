import { Item, Facet, Collection, Context } from '../types';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export interface MainState {
  itemList: Item[];
  collectionList: Collection[];
  selectedFacets: {};
  bboxFacet: {};
  datetimeFacet: {};
  availableFacets: Facet[];
  selectedItem?: Item;
  selectedCollection?: Collection;
  loading: boolean;
  query: string;
  context?: Context;
  limit?: number;
}

export interface StateType {
  main: MainState;
}

export interface ActionType<T> {
  type: string;
  payload: T;
}

export type ThunkResult<R> = ThunkAction<R, StateType, null, AnyAction>;