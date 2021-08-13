import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Collection } from '../types';

interface Props {
  collection?: Collection;
  item_id?: string;
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
              {this.props.collection.title}
            </Breadcrumb.Item>
          }
          { this.props.item_id && 
            <Breadcrumb.Item active>{this.props.item_id}</Breadcrumb.Item>
          }
        </Breadcrumb>
      </>
    );
  }
}

export default (BreadCrumb);