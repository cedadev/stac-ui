import React, { Component } from 'react';
import { Collection } from '../types';
import queryString from 'query-string';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setCollectionList, setPage, setMaxPage, setPageUrl } from '../state/actions/actions';
import { requestCollectionList } from '../requests';
import NavBar from "../Components/NavBar";
import BreadCrumb from "../Components/BreadCrumb";
import CollectionList from "../Components/CollectionList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


interface CollectionsStoreProps {
  collectionList: Collection[];
}

interface CollectionsDispatchProps {
  setCollectionList: (setCollectionList: Collection[]) => Action;
  setPage: (page: number) => Action;
  setMaxPage: (page: number) => Action;
  setPageUrl: (url: string) => Action;
  push: (path: string) => Action;
}

type CollectionsCombinedProps = CollectionsStoreProps & CollectionsDispatchProps;

class CollectionPage extends Component<(CollectionsCombinedProps), {}>  {

  public async componentDidMount(): Promise<void> {
    const result = await requestCollectionList();

    if (result.success && result.collectionList) {
      await this.setCollectionList(result.collectionList);
    };
    // set query and facets from params
    let params = queryString.parse(window.location.search);
    await this.setPage(Number(params.page));
    await this.setMaxPage(Number(10));
    const base_url = `${window.location.protocol}//${window.location.host}/` 
    await this.setPageUrl(base_url);
  };

  public setPage = async (page:number): Promise<void> => {
    if (page){
      this.props.setPage(page);
    } else {
      this.props.setPage(1);
    }
  };

  public setMaxPage = async (page:number): Promise<void> => {
    this.props.setMaxPage(page);
  };

  public setPageUrl = async (base_url:string): Promise<void> => {
    let url = base_url + `collections?`
    this.props.setPageUrl(url);
  };


  public setCollectionList = async (collectionList: Collection[]): Promise<void> => {
    this.props.setCollectionList(collectionList);
  };
  
  public handleItemClick = async (collection: Collection): Promise<void> => {
    this.props.push(`/collections/${collection.id}`);
  };

  public render(): React.ReactElement {
      return (
        <>
          <NavBar/>
          <Container>
            <BreadCrumb/>
            <Row>
              <Col>
                <div style={{borderBottom: '1px solid grey', textAlign: 'right'}}>{this.props.collectionList.length} Results</div>
                {this.props.collectionList !== [] ? (
                    <CollectionList collections={this.props.collectionList} onClick={this.handleItemClick}/>
                  ) : (
                    <p>No match found</p>
                  )}
              </Col>
            </Row>
          </Container>
        </>
      );
  }
}

const mapStateToProps = (state: StateType): CollectionsStoreProps => {
  return {
    collectionList: state.main.collectionList,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): CollectionsDispatchProps => ({
  setCollectionList: (collectionList: Collection[]) =>
    dispatch(setCollectionList(collectionList)),
  setPage: (page: number) =>
    dispatch(setPage(page)),
  setMaxPage: (page: number) =>
    dispatch(setMaxPage(page)),
  setPageUrl: (url: string) =>
    dispatch(setPageUrl(url)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);