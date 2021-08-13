import React, { Component } from 'react';
import { Collection } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setCollection, unsetCollection } from '../state/actions/actions';
import { requestCollection } from '../requests';
import NavBar from "../Components/NavBar";
import BreadCrumb from "../Components/BreadCrumb";
import ItemList from "../Components/ItemList";
import MetaDataList from "../Components/MetaDataList";
import Temporal from "../Components/Temporal";
import Spacial from "../Components/Spacial";
import FacetsBar from "../Components/FacetsBar";
import SearchBar from "../Components/SearchBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


interface CollectionProps {
  collection_id: string;
}
interface CollectionStoreProps {
  collection?: Collection;
}

interface CollectionDispatchProps {
  setCollection: (selectedCollection: Collection) => Action;
  unsetCollection: () => Action;
}


class CollectionPage extends Component<(CollectionProps & CollectionStoreProps & CollectionDispatchProps), {}>  {

  public async componentDidMount(): Promise<void> {
    const collectionResult = await requestCollection(this.props.collection_id);
    if (collectionResult.success && collectionResult.collection) {
      await this.setCollection(collectionResult.collection);
    };
  };

  public async componentWillUnmount(): Promise<void> {
    await this.setCollection();
  };

  public setCollection = async (collection?: Collection): Promise<void> => {
    if (collection) {
      this.props.setCollection(collection);
    } else {
      this.props.unsetCollection();
    };
  };

  public render(): React.ReactElement {
    if (this.props.collection) {
      return (
        <>
          <NavBar/>
          <Container fluid style={{marginBottom:'2em', paddingRight:'15em', paddingLeft:'15em'}}>
            <BreadCrumb collection={this.props.collection}/>
            <Row>
              <Col xs={12} sm={8} style={{textAlign: 'left'}}>
                <Row>
                  <Col xs={12} sm={{span: 11, offset: 1}}>
                    <h3>{this.props.collection.title}</h3>
                    <p>{this.props.collection.description}</p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{textAlign: 'center'}} xs={12} sm={4}>
                    <FacetsBar/>
                  </Col>
                  <Col>
                    <SearchBar/>
                    <h5>Items</h5>
                    <ItemList/>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} sm={4}>
                <Temporal interval={this.props.collection.temporal.interval}/><br/>
                <Spacial bbox={this.props.collection.spatial.bbox}/><br/>
                <MetaDataList metaData={this.props.collection.properties} />
              </Col>
            </Row>
          </Container>
          <footer></footer>
        </>
      );
    } else {
      return (
        <>
          <h3>No Collection</h3>
        </>
      );
    }
  }
}

const mapStateToProps = (state: StateType): CollectionStoreProps => {
  return {
    collection: state.main.selectedCollection,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): CollectionDispatchProps => ({
  setCollection: (collection: Collection) =>
    dispatch(setCollection(collection)),
  unsetCollection: () =>
    dispatch(unsetCollection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);