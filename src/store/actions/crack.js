import firebase, {firestore,storage} from "../../firebase/firebase";
import * as actionTypes from "./actionTypes";
export const addCrack = (data) => {
    return () => {
      var ID ="";
      firestore.collection("cracks").add({
        name: data.name,
        author: data.displayName,
        location: data.location,
        recommendation: data.recommendation,
        photoUrl: [],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then((doc)=>{
        ID = doc.id;
        const promises = [];
        let urls =[];
        data.image.forEach(file => {
          let uploadTask = storage.ref(`cracks/${file.id}`).put(file);
          promises.push(uploadTask);
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
            async () => {
              await uploadTask.snapshot.ref.getDownloadURL().then((data)=>{
                urls.push(data);
                console.log(data);
              }).then(()=>{
                firestore
                .collection("cracks")
                .doc(ID)
                .update({
                  photoUrl: urls
                })
              });
            }
          );
        });
        Promise.all(promises)
         .then((data) => console.log(data))
         .catch(err => console.log(err.code));
      });
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

export const searchCracks = (search) =>{
  let data = [];
  return (dispatch)=>{
    firestore
    .collection("cracks")
    .where("name", "==", search) 
    .get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        data.push({...{id: doc.id}, ...doc.data()});
    })
    }).then(()=>{
      dispatch({type: actionTypes.SEARCH_CRACKS, cracks: data})
    })

  }
} 