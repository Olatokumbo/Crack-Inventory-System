import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import { authReducer, crackReducer } from "./store/reducers";
import firebase from "./firebase/firebase";
import * as actionTypes from "./store/actions/actionTypes";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: authReducer,
  crack: crackReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

firebase.auth().onAuthStateChanged((user)=>{
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  
  if(user){
    store.dispatch({type: actionTypes.SIGNIN_SUCCESS, uid: user.uid, displayName: user.displayName})
  }
  else{
    console.log("LOGGED OUT")
  }
})