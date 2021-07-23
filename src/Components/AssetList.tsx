import React from 'react';
import { Asset } from '../types'

interface Props {
    assets: Asset[];
}

class AssetList extends React.Component<Props, {}> {

  private buildAssetTable(): React.ReactElement[] {
    const assetTable = this.props.assets.map(asset => {
      let tableRow = (

        <tr key={`${asset.id}`}>
          <td>
          <p style={{fontSize:'14px', marginBottom:'0'}}>{asset.title}</p>
              <p style={{color: 'grey', fontSize:'12px', marginBottom:'0'}}>&nbsp;&nbsp;&nbsp;&nbsp;{asset.type}</p>
          </td>
        </tr>
      );
      return tableRow;
    });

    return assetTable;
  }

  public render(): React.ReactElement {
    return <table className='table table-striped'><tbody>{this.buildAssetTable()}</tbody></table>
  }
}

export default (AssetList);