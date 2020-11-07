import React, { useState } from "react";
import {
  Modal,
  Fade,
  makeStyles,
  Backdrop,
  TextField,
  Button,
  Typography,
  TextareaAutosize,
} from "@material-ui/core";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions";
import style from "./EntryModal.module.css";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #a7a7a7de",
    boxShadow: theme.shadows[5],
    borderRadius: "10px",
    padding: theme.spacing(2, 4, 3),
  },
}));

const EntryModal = ({ modalState, closeModal, displayName, addCrack }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [image, setImage] = useState([])

const onFileChange = e => {
 for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
   // add an "id" property to each File object
      setImage(prevState => [...prevState, newFile]);
    }
  };
  const handleClose = () => {
    closeModal(true);
  };

  const AddEntry = (e) => {
    e.preventDefault();
    addCrack({displayName, name, location, image, recommendation})
    handleClose();
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalState}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalState}>
        <div className={classes.paper}>
          <div className={style.container}>
            <Typography align="center" gutterBottom>
              Add an Entry
            </Typography>
            <form onSubmit={AddEntry}>
              <TextField
                autoFocus={true}
                variant="outlined"
                label="Structure Name"
                size="small"
                className={style.input}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Location"
                size="small"
                className={style.input}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                accept="image/*"
                className={style.displayPhoto}
                id="raised-button-file"
                type="file"
                multiple
                onChange={onFileChange}
                required
              />
              <TextField
                disabled
                variant="outlined"
                label="Author"
                size="small"
                className={style.input}
                defaultValue={displayName}
              />
              <TextareaAutosize
                rowsMin={10}
                rowsMax={20}
                aria-label="maximum height"
                placeholder="Remarks"
                onChange={(e)=>setRecommendation(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!(name && location && recommendation && image)}
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    displayName: state.auth.displayName,
  };
};

const mapDispatchToProps = (dispatch)=>{
  return{
    addCrack: (data)=> dispatch(actionCreator.addCrack(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EntryModal);
