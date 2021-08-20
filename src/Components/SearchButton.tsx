import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import { Item, Collection, Context } from '../types';
import { requestSearchItems } from '../requests';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setItemList, setContext } from '../state/actions/actions';
import queryString from 'query-string';


interface SearchButtonStoreProps {
  query: string;
  selectedFacets: object;
  page?: number;
  collection?: Collection;
}

interface SearchButtonDispatchProps {
  push: (path: string) => Action;
  setItemList: (itemList: Item[]) => Action;
  setContext: (context: Context) => Action;
}

type SearchButtonCombinedProps = SearchButtonStoreProps & SearchButtonDispatchProps;

class SearchButton extends Component<SearchButtonCombinedProps, {}> {

  public async componentDidMount(): Promise<void> {
    let params = queryString.parse(window.location.search);
    // set query and facets from params
    if (Object.keys(params).length !== 0 || this.props.collection) {
      const url = this.constructUrl();
      await this.setItemList(url);
    }
  };

  public setItemList = async (url:string): Promise<void> => {
    const result = await requestSearchItems(url);
    if (result.success) {
      this.props.setItemList(result.itemList);
      this.props.setContext(result.context);
    }
  };

  private constructUrl = (): string => {
    const selectedFacets: any = this.props.selectedFacets;
    
    const bboxString = `${('eastBbox' in selectedFacets  && selectedFacets.eastBbox !== '') ? selectedFacets.eastBbox:'180'},\
${('northBbox' in selectedFacets  && selectedFacets.northBbox !== '') ? selectedFacets.northBbox:'90'},\
${('westBbox' in selectedFacets  && selectedFacets.westBbox !== '') ? selectedFacets.westBbox:'-180'},\
${('southBbox' in selectedFacets  && selectedFacets.southBbox !== '') ? selectedFacets.southBbox:'-90'}`;

    const datetimeString = `${('startTime' in selectedFacets) ? selectedFacets.startTime:'..'}:${('endTime' in selectedFacets) ? selectedFacets.endTime:'..'}`;
      
    const filters = [];
    for (const [key, filter] of Object.entries(this.props.selectedFacets)) {
      filters.push(`${key}:${filter}`);
    }
  
    const url = `?\
${`q=${this.props.query ? this.props.query:''}`}\
${(datetimeString !== '..:..') ? `&datetime=${datetimeString}`:''}\
${(bboxString !== '180,90,-180,-90') ? `&bbox=${bboxString}`:''}\
${`${this.props.page && this.props.page !== 1 ? `&page=${this.props.page}`:''}`}\
${`${this.props.collection ? `&collections=${this.props.collection.id}`:''}`}\
${`${filters ? `&filters={${filters.join('AND')}}`:''}`}`;
      return url;
    };


  public handleSearch = async (e: any): Promise<void> => {
    const url = this.constructUrl();
    this.setItemList(url);
    this.props.push(url);
  };

  public render(): React.ReactElement {
    return <Button variant="outline-secondary" onClick={this.handleSearch}>Search</Button>;
  }
}
const mapStateToProps = (state: StateType): SearchButtonStoreProps => {
    
  return {
    selectedFacets: state.main.selectedFacets,
    query: state.main.query,
    collection: state.main.selectedCollection,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): SearchButtonDispatchProps => ({
  setItemList: (itemList: Item[]) =>
    dispatch(setItemList(itemList)),
  setContext: (context: Context) =>
    dispatch(setContext(context)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchButton);