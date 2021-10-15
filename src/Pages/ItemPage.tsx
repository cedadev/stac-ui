import React, { Component } from 'react';
import { Item } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setItem, unsetItem } from '../state/actions/actions';
import { requestItem } from '../requests';
import NavBar from "../Components/NavBar";
import Spacial from "../Components/Spacial";
import BreadCrumb from "../Components/BreadCrumb";
import AssetList from "../Components/AssetList";
import MetaDataList from "../Components/MetaDataList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Temporal from '../Components/Temporal';


interface ItemProps {
  item_id: string;
  collection_id: string;
}
interface ItemStoreProps {
  item?: Item;
}

interface ItemDispatchProps {
  setItem: (setItem: Item) => Action;
  unsetItem: () => Action;
  push: (path: string) => Action;
}

type ItemCombinedProps = ItemProps & ItemStoreProps & ItemDispatchProps;

class ItemPage extends Component<ItemCombinedProps, {}>  {

  public async componentDidMount(): Promise<void> {
    const result = await requestItem(this.props.collection_id, this.props.item_id);

    if (result.success && result.item) {
      this.props.setItem(result.item);
    }
  }

  public async componentWillUnmount(): Promise<void> {
    this.props.unsetItem();
  };
  
  public render(): React.ReactElement {
    if (this.props.item) {
      return (
        <>
          <NavBar/>
          <Container>
            <BreadCrumb collection={this.props.item.collection} item_id={this.props.item.id}/>
            <Row>
              <Col xs={12} sm={8} style={{textAlign: 'left'}}>
                <h3 style={{marginBottom:'1em'}}>{this.props.item.id}</h3>
                <h5>Assets</h5>
                <AssetList assets={this.props.item.assets} />
              </Col>
              <Col>
              { this.props.item.properties.datetime && 
                <><Temporal interval={[this.props.item.properties.datetime]}/><br/></> 
              }
              { this.props.item.bbox && 
                <><Spacial bbox={this.props.item.bbox}/><br/></>
              }
                <MetaDataList metaData={this.props.item.properties} />
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
    item: state.main.item,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): ItemDispatchProps => ({
  setItem: (item: Item) =>
    dispatch(setItem(item)),
  unsetItem: () => 
    dispatch(unsetItem()),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);