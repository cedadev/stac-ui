import React, { Component } from 'react';
import { Item, Collection } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { selectCollection } from '../state/actions/actions';
import { requestCollection } from '../requests';
import NavBar from "../Components/NavBar";
import MapExtent from "../Components/MapExtent";
import BreadCrumb from "../Components/BreadCrumb";
import ItemList from "../Components/ItemList";
import MetaDataList from "../Components/MetaDataList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



interface CollectionProps {
  collection_id: string;
}
interface CollectionStoreProps {
  selectedCollection: Collection|undefined;
}

interface CollectionDispatchProps {
  selectCollection: (selectedCollection: Collection) => Action;
  push: (path: string) => Action;
}


class CollectionPage extends Component<(CollectionProps & CollectionStoreProps & CollectionDispatchProps), {}>  {

  public async componentDidMount(): Promise<void> {
    const result = await requestCollection(this.props.collection_id);

    if (result.success && result.collection) {
      await this.selectCollection(result.collection);
    };
  }
  
  public selectCollection = async (collection: Collection): Promise<void> => {
    this.props.selectCollection(collection);
  };

  public handleItemClick = async (item: Item): Promise<void> => {
    this.props.push(`/collections/${item.collection_id}/items/${item.id}`);
  };

  public render(): React.ReactElement {
    if (this.props.selectedCollection) {
      return (
        <>
          <NavBar/>
          <Container>
            <BreadCrumb collection_id={this.props.selectedCollection.id}/>
            <Row>
              <Col xs={12} sm={8} style={{textAlign: 'left'}}>
                <h3>{this.props.selectedCollection.title}</h3>
                <p>{this.props.selectedCollection.description}</p>
                <h5>Items</h5>
                <ItemList items={this.props.selectedCollection.items} onClick={this.handleItemClick} />
              </Col>
              <Col>
                <MapExtent bbox={this.props.selectedCollection.properties.bbox}/>
                <MetaDataList metaData={this.props.selectedCollection.properties} />
              </Col>
            </Row>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <h3>Collection</h3>
          <p>No item</p>
        </>
      );
    }
  }
}

const mapStateToProps = (state: StateType): CollectionStoreProps => {
  return {
    selectedCollection: state.main.selectedCollection,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): CollectionDispatchProps => ({
  selectCollection: (selectedCollection: Collection) =>
    dispatch(selectCollection(selectedCollection)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);