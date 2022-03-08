import React, { Component } from 'react';
import { Asset } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setAsset, unsetAsset } from '../state/actions/actions';
import { requestAsset, requestSearchAssetsPOST } from '../requests';
import NavBar from "../Components/NavBar";
import Spacial from "../Components/Spacial";
import BreadCrumb from "../Components/BreadCrumb";
import MetaDataList from "../Components/MetaDataList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Temporal from '../Components/Temporal';


interface AssetProps {
  asset_id: string;
  item_id: string;
  collection_id: string;
}
interface AssetStoreProps {
  asset?: Asset;
}

interface AssetDispatchProps {
  setAsset: (setAsset: Asset) => Action;
  unsetAsset: () => Action;
  push: (path: string) => Action;
}

type AssetCombinedProps = AssetProps & AssetStoreProps & AssetDispatchProps;

class AssetPage extends Component<AssetCombinedProps, {}>  {

  public async componentDidMount(): Promise<void> {
    const result = await requestSearchAssetsPOST({ids: [this.props.asset_id], items: [this.props.item_id]})
    // const result = await requestAsset(this.props.collection_id, this.props.item_id, this.props.asset_id);

    if (result.success && result.assetList[0]) {
      this.props.setAsset(result.assetList[0]);
    }
  }

  public async componentWillUnmount(): Promise<void> {
    this.props.unsetAsset();
  };
  
  public render(): React.ReactElement {
    if (this.props.asset) {
      return (
        <>
          <NavBar/>
          <Container fluid style={{marginBottom:'2em', paddingRight:'15em', paddingLeft:'15em'}}>
            <BreadCrumb collection={this.props.asset.item.collection} item_id={this.props.asset.item.id} asset_id={this.props.asset.id}/>
            <Row>
              <Col xs={12} sm={8} style={{textAlign: 'left'}}>
                <Row>
                  <Col sm={{span: 11, offset: 1}}>
                    <h3 style={{marginBottom:'1em'}}>{this.props.asset.id}</h3>
                  </Col>
                </Row>
              </Col>
              <Col sm={12}>
              { this.props.asset.properties.datetime && 
                <><Temporal interval={[this.props.asset.properties.datetime]}/><br/></> 
              }
              { this.props.asset.bbox && 
                <><Spacial bbox={this.props.asset.bbox}/><br/></>
              }
                <MetaDataList metaData={this.props.asset.properties} />
              </Col>
            </Row>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <>
            <h3>Asset</h3>
            <p>No item</p>
          </>
        </>
      );
    }
  }
}

const mapStateToProps = (state: StateType): AssetStoreProps => {
  return {
    asset: state.main.asset,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): AssetDispatchProps => ({
  setAsset: (asset: Asset) =>
    dispatch(setAsset(asset)),
  unsetAsset: () => 
    dispatch(unsetAsset()),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetPage);