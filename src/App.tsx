import React, { Component } from 'react';
import './App.css';
import log from 'loglevel';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import AppReducer from './state/reducers/app.reducer';
import thunk from 'redux-thunk';
import asyncMiddleware from './AsyncMiddleware';
import SearchPage from './Pages/SearchPage';
import AssetSearchPage from './Pages/AssetSearchPage';
import ItemPage from './Pages/ItemPage';
import AssetPage from './Pages/AssetPage';
import CollectionPage from './Pages/CollectionPage';
import CollectionListPage from './Pages/CollectionListPage';


const history = createBrowserHistory();
/* eslint-disable no-underscore-dangle, @typescript-eslint/no-explicit-any */
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const middleware = [thunk, routerMiddleware(history), asyncMiddleware];
export const store = createStore(
  AppReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
);

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
                <Route exact path="/asset/search" component={AssetSearchPage} />
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
                <Route exact path="/collections/:collection_id/items/:item_id/assets/:asset_id"
                  render={({ match,
                    }: RouteComponentProps<{collection_id: string, item_id: string, asset_id: string,}>) => (
                      <AssetPage collection_id={match.params.collection_id} item_id={match.params.item_id} asset_id={match.params.asset_id}/>
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
