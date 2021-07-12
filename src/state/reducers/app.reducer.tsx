import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import MainReducer from './main.reducer';


const AppReducer = (history: History): Reducer => 
  combineReducers({
    router: connectRouter(history),
    main: MainReducer,
});

export default AppReducer;