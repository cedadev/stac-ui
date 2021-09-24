import React from 'react';
import { Item, Collection, Context, Error, Facet } from '../types'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import Pagination from '../Components/Pagination';
import Spinner from 'react-bootstrap/Spinner';


interface ItemListStoreProps {
  collection?: Collection;
  itemList: Item[];
  context?: Context;
  loading: boolean;
  hasError: boolean;
}

interface ItemListDispatchProps {
  push: (path: string) => Action;
}

type ItemListCombinedProps = ItemListStoreProps & ItemListDispatchProps


class ItemList extends React.Component<ItemListCombinedProps, {}> {

  public handleItemClick = async (item: Item): Promise<void> => {
    this.props.push(`/collections/${item.collection.id}/items/${item.id}`);
  };

  private buildItemList(): React.ReactElement[] {
    const itemList = this.props.itemList?.map(item => {
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
    return itemList;
  }

  public render(): React.ReactElement {
    if (this.props.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          Error: There was an problem getting the search results
        </div>
      )
    } else if(this.props.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary" />
      )
    } else if (this.props.itemList.length === 0) {
      return (
        <div className="alert alert-info" role="alert">
          No results found
        </div>
      )
    } else {
      return (
          <>
            <div style={{borderBottom: '1px solid grey', textAlign: 'right'}}>{this.props.context ? `${this.props.context.matched} Items`: ''}</div>
            <ListGroup>{this.buildItemList()}</ListGroup>
            <Pagination/>
          </>
        )
    }
  }
}

const mapStateToProps = (state: StateType): ItemListStoreProps => {
  return {
    collection: state.main.selectedCollection,
    itemList: state.main.itemList,
    context: state.main.context,
    loading: state.main.itemListLoading,
    hasError: state.main.itemListError,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): ItemListDispatchProps => ({
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);