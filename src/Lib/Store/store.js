import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './root-reducer'
import { rootSaga } from './root-saga'
import { history } from '../../history'
// middlewared
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [sagaMiddleware, routeMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(...middlewares)),
)
sagaMiddleware.run(rootSaga)
