import React from "react";
import { Toolbar, AppBar, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreator from "../../store/actions" 
import style from "./Navbar.module.css"
const Navbar = ({startSignout}) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/home">
        <Typography variant="h6" className={style.title}>
          Crack Inventory System
        </Typography>
        </Link>
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
