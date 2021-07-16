import React, { Component } from 'react';
import { Item, Collection } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setCollectionList } from '../state/actions/actions';
import { requestCollectionList } from '../requests';
import NavBar from "../Components/NavBar";
import Map from "../Components/MapExtent";
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
  push: (path: string) => Action;
}

class CollectionPage extends Component<(CollectionsStoreProps & CollectionsDispatchProps), {}>  {

  public async componentDidMount(): Promise<void> {
    const result = await requestCollectionList();

    if (result.success && result.collectionList) {
      await this.setCollectionList(result.collectionList);
    };
  }

  public setCollectionList = async (collectionList: Collection[]): Promise<void> => {
    this.props.setCollectionList(collectionList);
  };
  
  public handleItemClick = async (collection: Collection): Promise<void> => {
    this.props.push(`/collections/${collection.id}/`);
  };

  public render(): React.ReactElement {
      return (
        <>
          <NavBar/>
          <Container>
            <BreadCrumb/>
            <Row>
              <div style={{borderBottom: '1px solid grey', textAlign: 'right'}}>{this.props.collectionList.length} Results</div>
              {this.props.collectionList !== [] ? (
                  <CollectionList collections={this.props.collectionList} onClick={this.handleItemClick}/>
                ) : (
                  <p>No match found</p>
                )}
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
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);