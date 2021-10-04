import React, { Component } from 'react';
import { Collection } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setCollection, unsetCollection, updateItemList } from '../state/actions/actions';
import { requestCollection } from '../requests';
import NavBar from "../Components/NavBar";
import BreadCrumb from "../Components/BreadCrumb";
import ItemList from "../Components/ItemList";
import MetaDataList from "../Components/MetaDataList";
import Temporal from "../Components/Temporal";
import Spacial from "../Components/Spacial";
import FacetsBar from "../Components/FacetsBar";
import SearchBar from "../Components/SearchBar";
import SearchButton from "../Components/SearchButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';


interface CollectionProps {
  collection_id: string;
}
interface CollectionStoreProps {
  collection?: Collection;
}

interface CollectionDispatchProps {
  setCollection: (selectedCollection: Collection) => Action;
  unsetCollection: () => Action;
  updateItemList: () => Action;
}

type CollectionCombinedProps = CollectionProps & CollectionStoreProps & CollectionDispatchProps;

class CollectionPage extends Component<(CollectionCombinedProps), { loading: boolean, hasError: boolean }>  {

  constructor(props: CollectionCombinedProps) {
    super(props);
    this.state = { loading: false, hasError: false };
  }

  public async componentDidMount(): Promise<void> {
    this.setState({ ...this.state, loading: true });
    const collectionResult = await requestCollection(this.props.collection_id);
    if (collectionResult.success) {
      await this.setCollection(collectionResult.collection);
    } else {
      this.setState({ ...this.state, hasError: true });
    }
    this.setState({ ...this.state, loading: false });
    this.props.updateItemList();
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
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          Error: There was an problem getting the collection
        </div>
      )
    } if (this.state.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary" />
      )
    } else if (this.props.collection) {
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
                  <Col xs={12} sm={8}>
                    <InputGroup className="mb-3">
                      <SearchBar/>
                      <InputGroup.Append>
                        <SearchButton />
                      </InputGroup.Append>
                    </InputGroup>
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
      )
    } else {
      return (
        <>
          <h3>No Collection</h3>
        </>
      )
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
  updateItemList: () =>
    dispatch(updateItemList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);