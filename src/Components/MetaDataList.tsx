import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
    metaData: {};
}

class MetaDataList extends React.Component<Props, {}> {

  private buildMetaDataList(): React.ReactElement[] {
    const metaDataList = Object.entries(this.props.metaData).map(metaData => {
      let listItem = (
        <ListGroup.Item
          id="asset-list-item"
        >
          {`${metaData[0]}: ${metaData[1]}`} 
        </ListGroup.Item>
      );
      return listItem;
    });

    return metaDataList;
  }

  public render(): React.ReactElement {
    return <ListGroup>{this.buildMetaDataList()}</ListGroup>;
  }
}

export default (MetaDataList);