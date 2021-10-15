import FormControl from 'react-bootstrap/FormControl';
import React, { Component } from 'react';
import { StateType } from '../state/app.types';
import { BboxFacet, Collection, DatetimeFacet, Facet } from '../types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setQuery } from '../state/actions/actions';
import queryString from 'query-string';
import { updateItemList } from '../state/actions/actions';
import constructUrl from '../Functions/ConstructURL';
import { push } from 'connected-react-router';


interface SearchBarStoreProps {
  query: string;
  searchFacets: Facet[];
  bboxFacet: BboxFacet;
  datetimeFacet: DatetimeFacet;
  page?: number;
  collection?: Collection;
}

interface SearchBarDispatchProps {
  setQuery: (query: string) => Action;
  updateItemList: () => Action;
  push: (path: string) => Action;
}

type SearchBarCombinedProps = SearchBarStoreProps & SearchBarDispatchProps;

class SearchBar extends Component<SearchBarCombinedProps, {}> {

  public async componentDidMount(): Promise<void> {
    let params = queryString.parse(window.location.search);
    // set query and facets from params
    if (params.query) {
      await this.setQuery(params.query);
    }
  };

  public setQuery = async (query:any): Promise<void> => {
    this.props.setQuery(this.props.query === undefined  ? '':query);
  };
  
  private handleQueryChange = async (e: any): Promise<void> => {
    this.props.setQuery(e.target.value);
  };

  private handleKeyPress = async (e: any): Promise<void> => {
    if (e.charCode === 13) {
      const url = constructUrl();
      this.props.updateItemList();
      this.props.push(url);
    }
  };

  public render(): React.ReactElement {
    return (
          <FormControl
            placeholder="Search"
            value={this.props.query}
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={this.handleQueryChange}
            onKeyPress={this.handleKeyPress}
          />
    );
  }
}
const mapStateToProps = (state: StateType): SearchBarStoreProps => {
  return {
    query: state.main.query,
    searchFacets: state.main.searchFacets,
    bboxFacet: state.main.bboxFacet,
    datetimeFacet: state.main.datetimeFacet,
    collection: state.main.collection,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): SearchBarDispatchProps => ({
  setQuery: (query: string) =>
    dispatch(setQuery(query)),
  push: (path: string) =>
    dispatch(push(path, 'search_button')),
  updateItemList: () =>
    dispatch(updateItemList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);