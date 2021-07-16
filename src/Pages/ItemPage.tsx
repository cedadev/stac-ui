import React, { Component } from 'react';
import { Item } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { selectItem } from '../state/actions/actions';
import { requestItem } from '../requests';
import NavBar from "../Components/NavBar";
import MapExtent from "../Components/MapExtent";
import BreadCrumb from "../Components/BreadCrumb";
import AssetList from "../Components/AssetList";
import MetaDataList from "../Components/MetaDataList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


interface ItemProps {
  item_id: string;
  collection_id: string;
}
interface ItemStoreProps {
  selectedItem: Item|undefined;
}

interface ItemDispatchProps {
  selectItem: (selectedItem: Item) => Action;
  push: (path: string) => Action;
}

type ItemCombinedProps =ItemProps & ItemStoreProps & ItemDispatchProps;

class ItemPage extends Component<ItemCombinedProps, {}>  {

  public async componentDidMount(): Promise<void> {
    const result = await requestItem(this.props.collection_id, this.props.item_id);

    if (result.success && result.item) {
      await this.selectItem(result.item);
    };
    if (result.success && result.item) {
    };

  }
  
  public selectItem = async (item: Item): Promise<void> => {
    this.props.selectItem(item);
  };

  public render(): React.ReactElement {
    if (this.props.selectedItem) {
      return (
        <>
          <NavBar/>
          <Container>
            <BreadCrumb collection_id={this.props.selectedItem.collection_id} item_id={this.props.selectedItem.id}/>
            <Row>
              <Col xs={12} sm={8} style={{textAlign: 'left'}}>
                <h3>{this.props.selectedItem.id}</h3>
                <h5>Assets</h5>
                <AssetList assets={this.props.selectedItem.assets} />
              </Col>
              <Col>
                <MapExtent bbox={this.props.selectedItem.bbox}/>
                <MetaDataList metaData={this.props.selectedItem.properties} />
              </Col>
            </Row>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <>
            <h3>Item</h3>
            <p>No item</p>
          </>
        </>
      );
    }
  }
}

const mapStateToProps = (state: StateType): ItemStoreProps => {
  return {
    selectedItem: state.main.selectedItem,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): ItemDispatchProps => ({
  selectItem: (selectedItem: Item) =>
    dispatch(selectItem(selectedItem)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);