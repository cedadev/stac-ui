import { Item, Facet, Collection } from '../types';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export interface MainState {
  itemList: Item[];
  selectedFacets: Facet[];
  availableFacets: Facet[];
  selectedItem?: Item;
  selectedCollection?: Collection;
  loading: boolean;
  query: string;
}

export interface StateType {
  main: MainState;
}

export interface ActionType<T> {
  type: string;
  payload: T;
}

export type ThunkResult<R> = ThunkAction<R, StateType, null, AnyAction>;