import React from 'react';
import { Item, Collection, Context } from '../types'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import Pagination from '../Components/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { unsetItemList } from '../state/actions/actions';


interface ItemListStoreProps {
  collection?: Collection;
  itemList?: Item[];
  context?: Context;
  hasError: boolean;
}

interface ItemListDispatchProps {
  push: (path: string) => Action;
  unsetItemList: () => Action;
}

type ItemListCombinedProps = ItemListStoreProps & ItemListDispatchProps


class ItemList extends React.Component<ItemListCombinedProps, {}> {

  public async componentWillUnmount(): Promise<void> {
    this.props.unsetItemList();
  };

  public handleItemClick = async (item: Item): Promise<void> => {
    this.props.push(`/collections/${item.collection.id}/items/${item.id}`);
  };

  private buildItemList(itemList: Item[]): React.ReactElement[] {
    const items = itemList.map(item => {
      const badges = [];
      for (const [key, value] of Object.entries(item.properties)) {
        badges.push(<Badge key={key} className="badge-secondary" style={{margin:'1px', fontSize:'90%'}}>{`${key}:${value}`}</Badge>)
      };

      let listItem = (
        <ListGroup.Item
          action
          id="item-list-item"
          key={item.id.toString()}
          onClick={() => {this.handleItemClick(item);}}
          style={{textAlign: 'left'}}
        >
          {!this.props.collection &&
            <p>Collection: <a href={`/collections/${item.collection.id}`}>{item.collection.title}</a></p>
          }
          {badges}
        </ListGroup.Item>
      );
      return listItem;
    });
    return items;
  }

  public render(): React.ReactElement {
    if (this.props.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          Error: There was an problem getting the search results
        </div>
      )
    } else if(this.props.itemList) {
      if (this.props.itemList.length === 0) {
        return (
          <div className="alert alert-info" role="alert">
            No results found
          </div>
        )
      } else {
        return (
          <>
            <div style={{borderBottom: '1px solid grey', textAlign: 'right'}}>{this.props.context ? `${this.props.context.matched} Items`: ''}</div>
            <ListGroup>{this.buildItemList(this.props.itemList)}</ListGroup>
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

const mapStateToProps = (state: StateType): ItemListStoreProps => {
  return {
    collection: state.main.collection,
    itemList: state.main.itemList,
    context: state.main.context,
    hasError: state.main.itemListError,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): ItemListDispatchProps => ({
  push: (path: string) =>
    dispatch(push(path)),
  unsetItemList: () =>
    dispatch(unsetItemList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);