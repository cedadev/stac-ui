import React from 'react';
import { Asset } from '../types'
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
    assets: Asset[];
}

class AssetList extends React.Component<Props, {}> {

  private buildAssetList(): React.ReactElement[] {
    const assetList = this.props.assets.map(asset => {
      let listItem = (
        <ListGroup.Item
          id="asset-list-item"
          key={asset.id.toString()}
        >
          {asset.id.toString()}
        </ListGroup.Item>
      );
      return listItem;
    });

    return assetList;
  }

  public render(): React.ReactElement {
    return <ListGroup>{this.buildAssetList()}</ListGroup>;
  }
}

export default (AssetList);