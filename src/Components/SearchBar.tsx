import FormControl from 'react-bootstrap/FormControl';
import React, { Component } from 'react';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setQuery } from '../state/actions/actions';
import queryString from 'query-string';
import { updateItemList, updateAssetList } from '../state/actions/actions';
import constructUrl from '../Functions/ConstructURL';
import { push } from 'connected-react-router';


interface SearchBarProps {
  type: String;
}

interface SearchBarStoreProps {
  query: string;
}

interface SearchBarDispatchProps {
  setQuery: (query: string) => Action;
  updateItemList: () => Action;
  updateAssetList: () => Action;
  push: (path: string) => Action;
}

type SearchBarCombinedProps = SearchBarProps & SearchBarStoreProps & SearchBarDispatchProps;

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
      if (this.props.type === "item") {
        this.props.updateItemList();
      } else if (this.props.type === "asset") {
        this.props.updateAssetList();
      }
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
  updateAssetList: () =>
    dispatch(updateAssetList())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);