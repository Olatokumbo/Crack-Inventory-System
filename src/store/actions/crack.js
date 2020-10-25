import firebase, {firestore,storage} from "../../firebase/firebase";
import * as actionTypes from "./actionTypes";
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
  
export const getCracks = () =>{
      return (dispatch)=>{
          let cracks = [];
          firestore
          .collection("cracks")
          .orderBy("timestamp", "desc")
          .onSnapshot((querySnapshot)=>{
              querySnapshot.forEach(doc=>{
                cracks.push({id: doc.id, ...doc.data()})
              })
            dispatch({type: actionTypes.VIEW_CRACKS, cracks})
            cracks = []
          })
      }
  }
export const getCrackInfo = (id) =>{
    return (dispatch)=>{
        firestore
        .collection("cracks")
        .doc(id)
        .get()
        .then((doc)=>{
            dispatch({type: actionTypes.VIEW_CRACK_INFO, crackInfo: {id: doc.id, ...doc.data()} })
        }).then(()=>{
        })
    }
}


export const removeCrackInfo = (id) =>{
  return ()=>{
    firestore
    .collection("cracks")
    .doc(id)
    .delete()
    .then(()=>{
        console.log("Entry has been deleted")
    })
  }
}

export const resetCrackInfo = ()=>{
  return(dispatch)=>{
    dispatch({type: actionTypes.RESET_CRACK_INFO})
  }
}