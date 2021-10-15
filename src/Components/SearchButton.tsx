import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { updateItemList } from '../state/actions/actions';
import constructUrl from '../Functions/ConstructURL';


interface SearchButtonDispatchProps {
  push: (path: string) => Action;
  updateItemList: () => Action;
}

type SearchButtonCombinedProps = SearchButtonDispatchProps;

class SearchButton extends Component<SearchButtonCombinedProps, {}> {

  public handleSearch = async (e: any): Promise<void> => {
    const url = constructUrl();
    this.props.updateItemList();
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
});

export default connect(null, mapDispatchToProps)(SearchButton);