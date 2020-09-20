import firebase, {firestore,storage} from "../../firebase/firebase";

export const addCrack = (data) => {
    return () => {
    const date = new Date();
      let uploadTask = storage.ref(`cracks/${date}_${data.image.name}`).put(data.image);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
        //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   dispatch({ type: actionTypes.START_PROGRESS, progress });
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref("cracks")
            .child(`${date}_${data.image.name}`)
            .getDownloadURL()
            .then((url) => {
              firestore.collection("cracks").add({
                name: data.name,
                author: data.displayName,
                location: data.location,
                recommendation: data.recommendation,
                photoURL: url,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            //   dispatch({ type: actionTypes.RESET_PROGRESS });
            });
        }
      );
    };
  };
  