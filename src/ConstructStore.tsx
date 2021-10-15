import { createStore, applyMiddleware, compose, AnyAction, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import AppReducer from './state/reducers/app.reducer';
import thunk from 'redux-thunk';
import asyncMiddleware from './AsyncMiddleware';


function constructStore(history: any): Store<any, AnyAction> {
  /* eslint-disable no-underscore-dangle, @typescript-eslint/no-explicit-any */
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  const middleware = [thunk, routerMiddleware(history), asyncMiddleware];
  const store = createStore(
    AppReducer(history),
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}

export default constructStore;