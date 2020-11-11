import React from "react";
import { TextField, Button } from "@material-ui/core";
import * as actionCreator from "../../store/actions";
import style from "./Settings.module.css";

const Settings = () => {
  const addRole = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    actionCreator.setAdmin(email);
  };
  return (
    <div className={style.settings}>
      <form onSubmit={addRole}>
        <TextField
          label="Add an Email"
          type="email"
          name="email"
          variant="outlined"
          size="small"
          className={style.input}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default Settings;
