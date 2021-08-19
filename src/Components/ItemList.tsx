import React from 'react';
import { Item, Collection } from '../types'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import Pagination from "../Components/Pagination";


interface ItemListStoreProps {
  collection?: Collection;
  itemList: Item[];
}

interface ItemListDispatchProps {
  push: (path: string) => Action;
}


class ItemList extends React.Component<ItemListStoreProps & ItemListDispatchProps, {}> {

  public handleItemClick = async (item: Item): Promise<void> => {
    this.props.push(`/collections/${item.collection.id}/items/${item.id}`);
  };

private buildItemList(): React.ReactElement[] {

    const itemList = this.props.itemList.map(item => {
      const badges = [];
      for (const [key, value] of Object.entries(item.properties)) {
        badges.push(<span key={key} className="badge badge-secondary" style={{margin:'1px', fontSize:'90%'}}>{`${key}:${value}`}</span>)
      };

      let listItem = (
        <ListGroup.Item
          action
          id="item-list-item"
          key={item.id.toString()}
          onClick={() => {this.handleItemClick(item);}}
          style={{textAlign: 'left', wordWrap: 'break-word'}}
        >
          {!this.props.collection &&
            <p>Collection: <a href={`/collections/${item.collection.id}`}>{item.collection.title}</a></p>
          }
          {badges}
        </ListGroup.Item>
      );
      return listItem;
    });

    return itemList;
  }

  public render(): React.ReactElement {
    return <><ListGroup>{this.buildItemList()}</ListGroup><Pagination/></>;
  }
}

const mapStateToProps = (state: StateType): ItemListStoreProps => {
  return {
    collection: state.main.selectedCollection,
    itemList: state.main.itemList,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): ItemListDispatchProps => ({
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);