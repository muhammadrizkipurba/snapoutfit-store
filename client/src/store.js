import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import rootReducer from "./reducers";

// const store = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

const store = createStore(
  rootReducer,
  compose(applyMiddleware(promiseMiddleware, ReduxThunk)
  )
);

export default store;