import React, { useState } from "react";
import {
  Modal,
  Fade,
  makeStyles,
  Backdrop,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
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

const EntryModal = ({ modalState, closeModal }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
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
            <Typography align="center" gutterBottom>Add an Entry</Typography>
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
              }}
              required
            />
            <TextField
              variant="outlined"
              label="Author"
              size="small"
              className={style.input}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
            type="date"
            variant="outlined"
            size="small"
            className={style.input}
            onChange={(e) => setDate(e.target.value)}
          />
            <Button
              variant="contained"
              color="primary"
              onClick={enterRoomClick}
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
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default EntryModal;
