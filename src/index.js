import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import { authReducer } from "./store/reducers";
import firebase from "./firebase/firebase";
import * as actionTypes from "./store/actions/actionTypes";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    store.dispatch({type: actionTypes.SIGNIN_SUCCESS, uid: user.uid})
  }
  else{
    console.log("LOGGED OUT")
  }
})