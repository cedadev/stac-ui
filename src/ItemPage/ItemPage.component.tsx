import React, { Component } from 'react';
import { Item, Facet } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { selectItem } from '../state/actions/actions';
import { requestItem } from '../requests';
import AssetList from "../Components/AssetList";
import MetaDataList from "../Components/MetaDataList";


interface ItemProps {
  item_id: string;
  collection_id: string;
}
interface ItemStoreProps {
  selectedItem: Item|undefined;
}

interface ItemDispatchProps {
  selectItem: (selectedItem: Item) => Action;
  push: (path: string) => Action;
}


class ItemPage extends Component<(ItemProps & ItemStoreProps & ItemDispatchProps), {}>  {

  public async componentDidMount(): Promise<void> {
    const result = await requestItem(this.props.collection_id, this.props.item_id);

    if (result.success && result.item) {
      await this.selectItem(result.item);
    };
  }
  
  public selectItem = async (item: Item): Promise<void> => {
    this.props.selectItem(item);
  };

  public render(): React.ReactElement {
    if (this.props.selectedItem) {
      return (
        <>
            <h3>Item</h3>
            <p>{this.props.selectedItem.id}</p>
            <a href={`/collections/${this.props.selectedItem.collection_id}`}>{this.props.selectedItem.collection_id}</a>
            <h4>meta data</h4>
            <MetaDataList metaData={this.props.selectedItem.properties} />
            <h4>Assets</h4>
            <AssetList assets={this.props.selectedItem.assets} />
        </>
      );
    } else {
      return (
        <>
            <>
            <h3>Item</h3>
            <p>No item</p>
            </>
        </>
      );
    }
  }
}

const mapStateToProps = (state: StateType): ItemStoreProps => {
  return {
    selectedItem: state.main.selectedItem,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): ItemDispatchProps => ({
  selectItem: (selectedItem: Item) =>
    dispatch(selectItem(selectedItem)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);