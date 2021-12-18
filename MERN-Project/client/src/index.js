import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk"
import rootReducer from './reducers'
import {getUsers} from "./actions/users.actions";

//dev tools
import {composeWithDevTools} from "redux-devtools-extension";
// import {logger} from "redux-logger/src";// Avoir les infos de redux Dans la console

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk)) //Logger
)

store.dispatch(getUsers)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
document.getElementById('root')
)
;

