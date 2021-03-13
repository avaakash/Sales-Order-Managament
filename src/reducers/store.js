import { createStore, combineReducers } from 'redux';
import orderTableReducer from './orderTable';

export const store = createStore(
    combineReducers({
        orderTable: orderTableReducer
    }),  /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);