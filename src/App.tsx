import React, { Component } from 'react';
import './App.css';
import log from 'loglevel';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { Provider } from 'react-redux';
import SearchPage from './Pages/SearchPage';
import ItemPage from './Pages/ItemPage';
import CollectionPage from './Pages/CollectionPage';
import CollectionListPage from './Pages/CollectionListPage';
import constructStore from './ConstructStore';

const history = createBrowserHistory();
export const store = constructStore(history);

class App extends Component<{}, { hasError: boolean }> {

  public constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: Error | null): void {
    this.setState({ hasError: true });
    log.error(`Failed with error: ${error}`);
    console.log(`Failed with error: ${error}`)
  }

  public async componentDidMount(): Promise<void> {
    this.setState({ hasError: false });
  }

  public render(): React.ReactElement {
    if (this.state.hasError) {
      return (
        <div className="error">
          <div
            style={{
              padding: 20,
              background: 'red',
              color: 'white',
              margin: 5,
            }}
          >
            Something went wrong...
          </div>
        </div>
      );
    }
    
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/collections" component={CollectionListPage} />
                <Route exact path="/collections/:collection_id"
                  render={({ match,
                    }: RouteComponentProps<{collection_id: string,}>) => (
                      <CollectionPage collection_id={match.params.collection_id}/>
                  )}
                />
                <Route exact path="/collections/:collection_id/items/:item_id"
                  render={({ match,
                    }: RouteComponentProps<{collection_id: string, item_id: string,}>) => (
                      <ItemPage collection_id={match.params.collection_id} item_id={match.params.item_id}/>
                  )}
                />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

export default (App);
