import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware, connectRouter } from "connected-react-router";
//import { reducer as formReducer } from 'redux-form';

//import * as configAction from "./actions/configAction";
import * as SignInAction from "./actions/SignInAction";

export default function configureStore(history, initialState) {
    const reducers = {
        router: connectRouter(history),
        //config: configAction.reducer,
        //form: formReducer,
        account: SignInAction.reducer
    };

    const middleware = [thunk, routerMiddleware(history)];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === "development";
    if (
        isDevelopment &&
        typeof window !== "undefined" &&
        window.devToolsExtension
    ) {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
    });

    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
}
