import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import { Collection, Facet } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { updateItemList } from '../state/actions/actions';


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
  updateItemList: (updateItemList: boolean) => Action;
}

type SearchButtonCombinedProps = SearchButtonStoreProps & SearchButtonDispatchProps;

class SearchButton extends Component<SearchButtonCombinedProps, {}> {

  private constructUrl = (): string => {
    const bboxFacet: any = this.props.bboxFacet;
    const datetimeFacet: any = this.props.datetimeFacet;
    
    const bboxString = `${(bboxFacet.westBbox !== '') ? bboxFacet.westBbox : '-180'},\
${(bboxFacet.southBbox !== '') ? bboxFacet.southBbox : '-90'},\
${(bboxFacet.eastBbox !== '') ? bboxFacet.eastBbox : '180'},\
${(bboxFacet.northBbox !== '') ? bboxFacet.northBbox : '90'}`;


    const datetimeString = `${(datetimeFacet.startTime) ? datetimeFacet.startTime.toISOString() : '..'}:${(datetimeFacet.endTime) ? datetimeFacet.endTime.toISOString() : '..'}`;
      
    const filters = [];
    for (const facet of this.props.searchFacets) {
      if (facet.value !== undefined && facet.value.length >= 1) {
        filters.push(`${facet.id}=${JSON.stringify(facet.value)}`);
      }
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
    this.props.updateItemList(true);
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
  push: (path: string) =>
    dispatch(push(path)),
  updateItemList: (pdateItemList: boolean) =>
    dispatch(updateItemList(pdateItemList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchButton);