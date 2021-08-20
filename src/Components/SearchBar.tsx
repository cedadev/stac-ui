import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import React, { Component, ReactElement } from 'react';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setQuery } from '../state/actions/actions';
import queryString from 'query-string';


interface SearchBarStoreProps {
  query: string;
}

interface SearchBarDispatchProps {
  setQuery: (query: string) => Action;
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

  public render(): React.ReactElement {
    return (
          <FormControl
            placeholder="Search"
            value={this.props.query}
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={this.handleQueryChange}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);