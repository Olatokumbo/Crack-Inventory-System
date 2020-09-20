import React from "react";
import { Toolbar, AppBar, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions" 
import style from "./Navbar.module.css"
const Navbar = ({startSignout}) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={style.title}>
          Crack Inventory System
        </Typography>
        <Button color="secondary" variant="contained" onClick={startSignout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

const mapDispatchToProps = (dispatch)=>{
  return{
    startSignout: ()=>dispatch(actionCreator.startSignout())
  }
}
export default connect(null, mapDispatchToProps)(Navbar);
