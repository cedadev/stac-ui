import React from 'react';
import { Item } from '../types'
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
  items: Item[];
  onClick: (item: Item) => void;
}

class ItemList extends React.Component<Props, {}> {

  private buildItemList(): React.ReactElement[] {
    const itemList = this.props.items.map(item => {
      let listItem = (
        <ListGroup.Item
          action
          id="item-list-item"
          key={item.id.toString()}
          onClick={() => {this.props.onClick(item);}}
          style={{textAlign: 'left'}}   
        >
          <p>Collection: <a href={`/collections/${item.collection_id}`}>{item.collection_id}</a></p>
          {JSON.stringify(item.properties)}
        </ListGroup.Item>
      );
      return listItem;
    });

    return itemList;
  }

  public render(): React.ReactElement {
    return <ListGroup>{this.buildItemList()}</ListGroup>;
  }
}

export default (ItemList);