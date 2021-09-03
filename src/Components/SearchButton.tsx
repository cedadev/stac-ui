import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import { Item, Collection, Context, Facet, Error } from '../types';
import { requestSearchItems, requestSearchItemsPOST } from '../requests';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setItemList, setContext, setError, setItemListLoading } from '../state/actions/actions';
import queryString from 'query-string';


interface SearchButtonStoreProps {
  query: string;
  searchFacets: Facet[];
  bboxFacet: object;
  datetimeFacet: object;
  page?: number;
  collection?: Collection;
}

interface SearchButtonDispatchProps {
  push: (path: string) => Action;
  setItemList: (itemList: Item[]) => Action;
  setContext: (context: Context) => Action;
  setError: (error: Error) => Action;
  setItemListLoading: (isLoading: boolean) => Action;
}

type SearchButtonCombinedProps = SearchButtonStoreProps & SearchButtonDispatchProps;

class SearchButton extends Component<SearchButtonCombinedProps, {}> {

  public async componentDidMount(): Promise<void> {
    let params = queryString.parse(window.location.search);
    // set query and facets from params
    if (Object.keys(params).length !== 0 || this.props.collection) {
      const body = this.constructPOST();
      await this.setItemListPOST(body);
    }
  };

  public setItemListLoading = async (isLoading: boolean): Promise<void> => {
    this.props.setItemListLoading(isLoading);
  };

  public setItemList = async (url: string): Promise<void> => {
    this.setItemListLoading(true);
    const result = await requestSearchItems(url);
    if (result.success) {
      this.props.setItemList(result.itemList);
      this.props.setContext(result.context);
    } else {
      this.props.setError({hasError:true, type:'setItemList'});
    }
    this.setItemListLoading(false);
  };

  public setItemListPOST = async (body: any): Promise<void> => {
    this.setItemListLoading(true);
    const result = await requestSearchItemsPOST(body);
    if (result.success) {
      this.props.setItemList(result.itemList);
      this.props.setContext(result.context);
    } else {
      this.props.setError({hasError:true, type:'setItemList'});
    }
    this.setItemListLoading(false);
  };

  private constructPOST = (): {} => {
    
    const searchFacets = this.props.searchFacets;
    const bboxFacet: any = this.props.bboxFacet;
    const datetimeFacet: any = this.props.datetimeFacet;
    
    const bboxList = [
      `${(bboxFacet.westBbox !== '') ? bboxFacet.westBbox : '-180'}`,
      `${(bboxFacet.southBbox !== '') ? bboxFacet.southBbox : '-90'}`,
      `${(bboxFacet.eastBbox !== '') ? bboxFacet.eastBbox : '180'}`,
      `${(bboxFacet.northBbox !== '') ? bboxFacet.northBbox : '90'}`,
    ];

    const datetimeString = `${('startTime' in datetimeFacet) ? datetimeFacet.startTime:'..'}:${('endTime' in datetimeFacet) ? datetimeFacet.endTime : '..'}`;

    var filter = {};
    for (const facet of searchFacets) {
      if (typeof facet.value !== undefined) {
        filter = {
        ...filter,
        [facet.id]: facet.value
      };
      }
      
    }
   
    const POSTbody = {
      ...(this.props.collection && {collections: [this.props.collection.id]}),
      ...((bboxList[0] !== '-180' || bboxList[1] !== '-90' || bboxList[2] !== '180' || bboxList[3] !== '90') && {bbox: bboxList}),
      ...(datetimeString !== '..:..' && {datetime: datetimeString}),
      ...(Object.entries(filter).length !== 0 && {filter: filter}),
      ...(this.props.query && {q: this.props.query}),
      ...((this.props.page && this.props.page !== 1) && {page: this.props.page}),
    }
    console.log(`POSTBody:`, POSTbody)

    return POSTbody;
  };
  
  private constructUrl = (): string => {
    const bboxFacet: any = this.props.bboxFacet;
    const datetimeFacet: any = this.props.datetimeFacet;
    
    const bboxString = `${(bboxFacet.westBbox !== '') ? bboxFacet.westBbox : '-180'},\
${(bboxFacet.southBbox !== '') ? bboxFacet.southBbox : '-90'},\
${(bboxFacet.eastBbox !== '') ? bboxFacet.eastBbox : '180'},\
${(bboxFacet.northBbox !== '') ? bboxFacet.northBbox : '90'}`;


    const datetimeString = `${('startTime' in datetimeFacet) ? datetimeFacet.startTime:'..'}:${('endTime' in datetimeFacet) ? datetimeFacet.endTime : '..'}`;
      
    const filters = [];
    for (const facet of this.props.searchFacets) {
      filters.push(`${facet.id}=${JSON.stringify(facet.value)}`);
    };
  
    const url = `?\
${`q=${this.props.query ? this.props.query:''}`}\
${(datetimeString !== '..:..') ? `&datetime=${datetimeString}`:''}\
${(bboxString !== '-180,-90,180,90') ? `&bbox=${bboxString}`:''}\
${`${this.props.page && this.props.page !== 1 ? `&page=${this.props.page}`:''}`}\
${`${this.props.collection ? `&collections=${this.props.collection.id}`:''}`}\
${`${filters.length !== 0 ? `&filters=${filters.join('AND')}`:''}`}`;
    
    return url;
  };


  public handleSearch = async (e: any): Promise<void> => {
    const url = this.constructUrl();
    const body = this.constructPOST();
    this.setItemListPOST(body);
    this.props.push(url);
  };

  public render(): React.ReactElement {
    return <Button variant="outline-secondary" onClick={this.handleSearch}>Search</Button>;
  }
}
const mapStateToProps = (state: StateType): SearchButtonStoreProps => {
    
  return {
    searchFacets: state.main.searchFacets,
    bboxFacet: state.main.bboxFacet,
    datetimeFacet: state.main.datetimeFacet,
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
  setError: (error: Error) =>
    dispatch(setError(error)),
  setItemListLoading: (isLoading: boolean) =>
    dispatch(setItemListLoading(isLoading)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchButton);