import React from 'react';
import { Collection } from '../types'
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from "../Components/Pagination";


interface Props {
  collections: Collection[];
  onClick: (collection: Collection) => void;
}

class CollectionList extends React.Component<Props, {}> {

  private buildCollectionList(): React.ReactElement[] {
    const collectionList = this.props.collections.map(collection => {
      let listCollection = (
        <ListGroup.Item
          action
          id="collection-list-item"
          key={collection.id.toString()}
          onClick={() => {this.props.onClick(collection);}}        
        >
          <h5>{collection.title}</h5>
          { collection.properties.keywords &&
            <p>Keywords: {collection.properties.keywords.join(', ')}</p>
          }
        </ListGroup.Item>
      );
      return listCollection;
    });

    return collectionList;
  }

  public render(): React.ReactElement {

    return <><ListGroup>{this.buildCollectionList()}</ListGroup></>;
  }
}

export default (CollectionList);