import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk, {
    ThunkMiddleware
} from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import './index.css';
import * as serviceWorker from './serviceWorker';

/*
type State = {
    foo: string;
};
type Actions = { type: 'FOO' } | { type: 'BAR', result: number };
const middleware = [thunk as ThunkMiddleware<State, Actions>];*/
import initAxios from './utils/axios'
initAxios();

const middleware = [thunk];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger())
// }

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);
//(store.dispatch as ThunkDispatch<Redux.Store.Definition, void, AnyAction>)( bootstrap() );

ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
