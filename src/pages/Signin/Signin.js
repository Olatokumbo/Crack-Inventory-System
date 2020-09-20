import React from "react";
import { TextField, Button, Typography} from "@material-ui/core";
import logo from "../../assets/images/lpu.png";
import style from "./Signin.module.css";
const Signin = () => {
  return (
    <div className={style.main}>
      <div className={style.left}></div>
      <div className={style.right}>
        <div className={style.brand}>
          <img className={style.logo} src={logo} alt="logo.png" /> 
          <Typography variant='h5' color="textSecondary" >Crack Inventory System</Typography>
        </div>
        <form className={style.form}>
          <TextField
            name="email"
            type="text"
            className={style.input}
            variant="outlined"
            label="Email"
            size="small"
          />
          <TextField
            name="password"
            type="password"
            className={style.input}
            variant="outlined"
            label="Password"
            size="small"
          />
          <Button
            type="submit"
            className={style.signin}
            variant="contained"
            size="small"
            color="primary"
          >
            Sign In
          </Button>
          <Typography color="error" variant="body2">
          error
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Signin;
