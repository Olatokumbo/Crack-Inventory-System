import { provider, auth } from "../../firebase/firebase";
import * as actionTypes from "./actionTypes";
export const startSignin = () => {
  return () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("User has Signed in");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const startSignout = () => {
  return (dispatch) => {
    auth.signOut().then(() => {
      console.log("Signed Out");
      dispatch({ type: actionTypes.SIGNOUT_SUCCESS });
    });
  };
};
