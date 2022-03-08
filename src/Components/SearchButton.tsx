import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { updateItemList, updateAssetList } from '../state/actions/actions';
import constructUrl from '../Functions/ConstructURL';


interface SearchButtonProps {
  type: String;
}

interface SearchButtonDispatchProps {
  push: (path: string) => Action;
  updateItemList: () => Action;
  updateAssetList: () => Action;
}

type SearchButtonCombinedProps = SearchButtonProps & SearchButtonDispatchProps;

class SearchButton extends Component<SearchButtonCombinedProps, {}> {

  public handleSearch = async (e: any): Promise<void> => {
    const url = constructUrl();
    if (this.props.type === "item") {
      this.props.updateItemList();
    } else if (this.props.type === "asset") {
      this.props.updateAssetList();
    }
    this.props.push(url);
  };

  public render(): React.ReactElement {
    return <Button variant="outline-secondary" onClick={this.handleSearch}>Search</Button>;
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): SearchButtonDispatchProps => ({
  push: (path: string) =>
    dispatch(push(path, 'search_button')),
  updateItemList: () =>
    dispatch(updateItemList()),
    updateAssetList: () =>
    dispatch(updateAssetList()),
});

export default connect(null, mapDispatchToProps)(SearchButton);