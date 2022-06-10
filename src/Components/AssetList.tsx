import React from 'react';
import { Asset, Item, Collection, Context } from '../types'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import Pagination from '../Components/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { unsetAssetList } from '../state/actions/actions';


interface AssetListStoreProps {
  item?: Item;
  assetList?: Asset[];
  context?: Context;
  hasError: boolean;
}

interface AssetListDispatchProps {
  push: (path: string) => Action;
  unsetAssetList: () => Action;
}

type AssetListCombinedProps = AssetListStoreProps & AssetListDispatchProps


class AssetList extends React.Component<AssetListCombinedProps, {}> {

  public async componentWillUnmount(): Promise<void> {
    this.props.unsetAssetList();
  };

  public handleAssetClick = async (asset: Asset): Promise<void> => {
    this.props.push(`/collections/${asset.item.collection.id}/items/${asset.item.id}/assets/${asset.id}`);
  };

  private buildAssetList(assetList: Asset[]): React.ReactElement[] {
    const assets = assetList.map(asset => {
      const badges = [];
      for (const [key, value] of Object.entries(asset.properties)) {
        badges.push(<Badge key={key} className="badge-secondary" style={{margin:'1px', fontSize:'90%'}}>{`${key}:${value}`}</Badge>)
      };

      let listAsset = (
        <ListGroup.Item
          action
          id="asset-list-asset"
          key={asset.id.toString()}
          onClick={() => {this.handleAssetClick(asset);}}
          style={{textAlign: 'left'}}
        >
          {!this.props.item &&
            <p>Item: <a href={`/collections/${asset.item.collection.id}/items/${asset.item.id}`}>{asset.item.id}</a></p>
          }
          {badges}
        </ListGroup.Item>
      );
      return listAsset;
    });
    return assets;
  }

  public render(): React.ReactElement {
    if (this.props.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          Error: There was an problem getting the search results
        </div>
      )
    } else if(this.props.assetList) {
      if (this.props.assetList.length === 0) {
        return (
          <div className="alert alert-info" role="alert">
            No results found
          </div>
        )
      } else {
        return (
          <>
            <div style={{borderBottom: '1px solid grey', textAlign: 'right'}}>{this.props.context ? `${this.props.context.matched} Assets`: ''}</div>
            <ListGroup>{this.buildAssetList(this.props.assetList)}</ListGroup>
            <Pagination/>
          </>
        )
      }
    } else {
      return (
        <Spinner animation="border" role="status" variant="primary" />
      )
    }
  }
}

const mapStateToProps = (state: StateType): AssetListStoreProps => {
  return {
    item: state.main.item,
    assetList: state.main.assetList,
    context: state.main.context,
    hasError: state.main.listError,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): AssetListDispatchProps => ({
  push: (path: string) =>
    dispatch(push(path)),
  unsetAssetList: () =>
    dispatch(unsetAssetList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetList);