import React from 'react';
import { Collection, Context } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setCollectionList, setContext } from '../state/actions/actions';
import { requestCollectionList } from '../requests';
import { push } from 'connected-react-router';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from "../Components/Pagination";
import Spinner from 'react-bootstrap/Spinner';


interface CollectionListStoreProps {
  collectionList: Collection[];
  context?: Context;
}

interface CollectionListDispatchProps {
  setCollectionList: (setCollectionList: Collection[]) => Action;
  setContext: (context: Context) => Action;
  push: (path: string) => Action;
}

type CollectionListCombinedProps = CollectionListStoreProps & CollectionListDispatchProps;

class CollectionList extends React.Component<CollectionListCombinedProps, {loading: boolean, hasError: boolean}> {

  constructor(props: CollectionListCombinedProps) {
    super(props);
    this.state = { loading: false, hasError: false };
  }

  public async componentDidMount(): Promise<void> {
    await this.setCollectionList();
  };
  
  public setCollectionList = async (): Promise<void> => {
    this.setState({...this.state, loading: true});
    const result = await requestCollectionList();
    if (result.success) {
      this.props.setCollectionList(result.collectionList);
      this.props.setContext(result.context);
    } else {
      this.setState({...this.state, hasError: true});
    }
    this.setState({...this.state, loading: false});
  };

  public handleItemClick = async (collection: Collection): Promise<void> => {
    this.props.push(`/collections/${collection.id}`)
  };

  private buildCollectionList(): React.ReactElement[] {
    const collectionList = this.props.collectionList.map(collection => {
      let listCollection = (
        <ListGroup.Item
          action
          id="collection-list-item"
          key={collection.id.toString()}
          onClick={() => {this.handleItemClick(collection);}}        
        >
          <h5>{collection.title}</h5>
          { collection.properties.keywords &&
            <p>Keywords: {collection.properties.keywords.join(', ')}</p>
          }
        </ListGroup.Item>
      )
      return listCollection;
    })
    return collectionList;
  }

  public render(): React.ReactElement {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          Error: There was an problem getting the collection list
        </div>
      )
    } else if(!this.state.loading) {
      return (
        <>
          <div style={{borderBottom: '1px solid grey', textAlign: 'right'}}>{this.props.collectionList.length} Results</div>
          <ListGroup>{this.buildCollectionList()}</ListGroup>
          <Pagination/>
        </>
      )
    } else {
      return (
        <Spinner animation="border" role="status" variant="primary" />
      )
    }
  }
}


const mapStateToProps = (state: StateType): CollectionListStoreProps => {
  return {
    collectionList: state.main.collectionList,
    context: state.main.context,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): CollectionListDispatchProps => ({
  setCollectionList: (collectionList: Collection[]) =>
    dispatch(setCollectionList(collectionList)),
  setContext: (context: Context) =>
    dispatch(setContext(context)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);