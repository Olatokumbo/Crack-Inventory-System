import React from "react";
import { Button, Typography} from "@material-ui/core";
import logo from "../../assets/images/lpu.png";
import {connect} from "react-redux";
import * as actionCreator from "../../store/actions" 
import style from "./Signin.module.css";
const Signin = ({startSignin}) => {
  return (
    <div className={style.main}>
      <div className={style.left}></div>
      <div className={style.right}>
        <div className={style.brand}>
          <img className={style.logo} src={logo} alt="logo.png" /> 
          <Typography variant='h5' color="textSecondary" >Crack Inventory System</Typography>
        </div>
          <Button
            type="submit"
            className={style.signin}
            variant="contained"
            size="small"
            color="primary"
            onClick={startSignin}
          >
            Sign in with GOOGLE
          </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=>{
  return{
    startSignin: ()=>dispatch(actionCreator.startSignin()),
  }
}

export default connect(null, mapDispatchToProps)(Signin);
