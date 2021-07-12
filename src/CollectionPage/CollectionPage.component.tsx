import React, { Component } from 'react';
import { Item, Collection } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { selectCollection } from '../state/actions/actions';
import { requestCollection } from '../requests';
import ItemList from "../Components/ItemList";
import MetaDataList from "../Components/MetaDataList";


interface CollectionProps {
  collection_id: string;
}
interface CollectionStoreProps {
  selectedCollection: Collection|undefined;
}

interface CollectionDispatchProps {
  selectCollection: (selectedCollection: Collection) => Action;
  push: (path: string) => Action;
}


class CollectionPage extends Component<(CollectionProps & CollectionStoreProps & CollectionDispatchProps), {}>  {

  public async componentDidMount(): Promise<void> {
    const result = await requestCollection(this.props.collection_id);

    if (result.success && result.collection) {
      await this.selectCollection(result.collection);
    };
  }
  
  public selectCollection = async (collection: Collection): Promise<void> => {
    this.props.selectCollection(collection);
  };

  public handleItemClick = async (item: Item): Promise<void> => {
    this.props.push(`/collections/${item.collection_id}/items/${item.id}`);
  };

  public render(): React.ReactElement {
    if (this.props.selectedCollection) {
      return (
        <>
            <h3>Collection</h3>
            <p>{this.props.selectedCollection.title}</p>
            <h4>Description</h4>
            <p>{this.props.selectedCollection.description}</p>
            <h4>Properties</h4>
            <MetaDataList metaData={this.props.selectedCollection.properties} />
            <h4>Items</h4>
            <ItemList items={this.props.selectedCollection.items} onClick={this.handleItemClick} />
        </>
      );
    } else {
      return (
        <>
            <>
            <h3>Collection</h3>
            <p>No item</p>
            </>
        </>
      );
    }
  }
}

const mapStateToProps = (state: StateType): CollectionStoreProps => {
  return {
    selectedCollection: state.main.selectedCollection,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): CollectionDispatchProps => ({
  selectCollection: (selectedCollection: Collection) =>
    dispatch(selectCollection(selectedCollection)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);