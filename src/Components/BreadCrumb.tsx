import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Collection } from '../types';

interface Props {
  collection?: Collection;
  item_id?: string;
  asset_id?: string;
}

class BreadCrumb extends React.Component<Props, {}> {

  public render(): React.ReactElement {
    return (
      <>
        <br/>
        <Breadcrumb>
          <Breadcrumb.Item active={(!this.props.collection && !this.props.item_id) ? true: false} href="/collections">Collections</Breadcrumb.Item>
          { this.props.collection && 
            <Breadcrumb.Item active={(!this.props.item_id) ? true: false} href={`/collections/${this.props.collection.id}`}>
              {this.props.collection.title ? this.props.collection.title : this.props.collection.id}
            </Breadcrumb.Item>
          }
          { (this.props.collection && this.props.item_id) && 
            <Breadcrumb.Item active={(!this.props.asset_id) ? true: false} href={`/collections/${this.props.collection.id}/items/${this.props.item_id}`}>{this.props.item_id}</Breadcrumb.Item>
          }
          { this.props.asset_id && 
            <Breadcrumb.Item active>{this.props.asset_id}</Breadcrumb.Item>
          }
        </Breadcrumb>
      </>
    );
  }
}

export default (BreadCrumb);