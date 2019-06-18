import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import sagas from "./sagas";
import logger from 'redux-logger'


const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware,logger];

export function configureStore(initialState) {

    console.log("==========START configurateStore============")
    console.log(initialState);
    

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middlewares))
    );
    console.log("crate store done.");
    sagaMiddleware.run(sagas);
    console.log("saga started");

    console.log("=========END configurateStore==============")

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
