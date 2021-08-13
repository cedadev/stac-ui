import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import React, { Component, ReactElement } from 'react';
import { Item, Collection } from '../types';
import { requestSearchItems } from '../requests';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setQuery, setItemList } from '../state/actions/actions';
import queryString from 'query-string';


interface SearchBarStoreProps {
  query: string;
  selectedFacets: object;
  page?: number;
  collection?: Collection;
}

interface SearchBarDispatchProps {
  setQuery: (query: string) => Action;
  push: (path: string) => Action;
  setItemList: (itemList: Item[]) => Action;
}

type SearchBarCombinedProps = SearchBarStoreProps & SearchBarDispatchProps;

class SearchBar extends Component<SearchBarCombinedProps, {}> {

  public async componentDidMount(): Promise<void> {
    let params = queryString.parse(window.location.search);
    // set query and facets from params
    if (Object.keys(params).length !== 0 || this.props.collection) {
      await this.setQuery(params.query);
      const url = this.constructUrl();
      await this.setItemList(url);
    }
  };

  public setQuery = async (query:any): Promise<void> => {
    this.props.setQuery(this.props.query === undefined  ? '':query);
  };
  
  public setItemList = async (url:string): Promise<void> => {
    const result = await requestSearchItems(url);
    if (result.success) {
      this.props.setItemList(result.itemList);
    }
  };

  private handleQueryChange = async (e: any): Promise<void> => {
    this.props.setQuery(e.target.value);
  };

  private constructUrl = (): string => {
    const selectedFacets: any = this.props.selectedFacets;
    
    const bboxString = `${('eastBbox' in selectedFacets  && selectedFacets.eastBbox !== '') ? selectedFacets.eastBbox:'180'},\
${('northBbox' in selectedFacets  && selectedFacets.northBbox !== '') ? selectedFacets.northBbox:'90'},\
${('westBbox' in selectedFacets  && selectedFacets.westBbox !== '') ? selectedFacets.westBbox:'-180'},\
${('southBbox' in selectedFacets  && selectedFacets.southBbox !== '') ? selectedFacets.southBbox:'-90'}`;

    const datetimeString = `${('startTime' in selectedFacets) ? selectedFacets.startTime:'..'}:${('endTime' in selectedFacets) ? selectedFacets.endTime:'..'}`;

    const url = `?\
${`query=${this.props.query ? this.props.query:''}`}\
${(datetimeString !== '..:..') ? `&datetime=${datetimeString}`:''}\
${(bboxString !== '180,90,-180,-90') ? `&bbox=${bboxString}`:''}\
${`${this.props.page && this.props.page !== 1 ? `&page=${this.props.page}`:''}`}\
${`${this.props.collection ? `&collections=${this.props.collection.id}`:''}`}`;
    return url;
  };

  public handleSearch = async (e: any): Promise<void> => {
    const url = this.constructUrl();
    this.setItemList(url);
    this.props.push(url);
  };

  private buildSearchBar(): ReactElement {
    const SearchBar = (
      <>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search"
            value={this.props.query}
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={this.handleQueryChange}
          />
          <InputGroup.Append>
          <Button variant="outline-secondary" onClick={this.handleSearch}>Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </>
    );

    return SearchBar;
  }

  public render(): React.ReactElement {
    return <>{this.buildSearchBar()}</>;
  }
}
const mapStateToProps = (state: StateType): SearchBarStoreProps => {
    
  return {
    selectedFacets: state.main.selectedFacets,
    page: state.main.page,
    query: state.main.query,
    collection: state.main.selectedCollection,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): SearchBarDispatchProps => ({
  setQuery: (query: string) =>
    dispatch(setQuery(query)),
  setItemList: (itemList: Item[]) =>
    dispatch(setItemList(itemList)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);