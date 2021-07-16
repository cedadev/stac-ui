import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

interface Props {
  collection_id?: string;
  item_id?: string;
}

class BreadCrumb extends React.Component<Props, {}> {

  public render(): React.ReactElement {
    return (
      <Breadcrumb>
        <Breadcrumb.Item active={(!this.props.collection_id && !this.props.item_id) ? true: false} href="Collections">Collections</Breadcrumb.Item>
        { this.props.collection_id && 
          <Breadcrumb.Item active={(!this.props.item_id) ? true: false} href={`/collections/${this.props.collection_id}`}>
            {this.props.collection_id}
          </Breadcrumb.Item>
        }
        { this.props.item_id && 
          <Breadcrumb.Item active>{this.props.item_id}</Breadcrumb.Item>
        }
      </Breadcrumb>
    );
  }
}

export default (BreadCrumb);