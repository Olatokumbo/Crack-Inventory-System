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

const EntryModal = ({ modalState, closeModal, displayName }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const handleClose = () => {
    closeModal(true);
  };

  const enterRoomClick = () => {
    // enterRoom(uid, name, password);
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
            <form>
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
                onChange={(e) => {
                  setPhotoURL(e.target.files[0]);
                }}
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
                placeholder="Recommendation"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={enterRoomClick}
              >
                Add
              </Button>
            </form>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
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
export default connect(mapStateToProps)(EntryModal);
