import {createStore, applyMiddleware, compose} from 'redux'
import {combineReducers} from 'redux';
import thunk from 'redux-thunk'
import uploadQueue from './upload-queue';

const initialState = {};
const enhancers = [];
const middleware = [thunk,];

if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const combinedReducers = combineReducers({
    uploadQueue
});

export type AppState = ReturnType<typeof combinedReducers>;

export default createStore(
    combinedReducers,
    initialState,
    composedEnhancers
);
