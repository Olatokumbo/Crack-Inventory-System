import firebase, { firestore } from "../../firebase/firebase";

export const startSignin = (data) => {
  return () => {
    firestore
      .collection("cracks")
      .add({
        name: data.name,
        location: data.location,
        author: data.author,
        photoURL: data.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {});
  };
};
