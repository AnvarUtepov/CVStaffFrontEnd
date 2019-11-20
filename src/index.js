import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from "history";
import ConfigureStore from "./store/ConfigureStore";
import axios from "axios";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const history = createBrowserHistory({ basename: baseUrl });
const initialState = window.initialReduxState;
const store = ConfigureStore(history, initialState);

axios.defaults.baseURL = process.env.REACT_APP_URL;
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem(process.env.REACT_APP_USER);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
