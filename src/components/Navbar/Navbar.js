import React from "react";
import { Toolbar, AppBar, Typography, Button } from "@material-ui/core";
import style from "./Navbar.module.css"
const Navbar = () => {
  return (
    <AppBar position="inherit">
      <Toolbar>
        <Typography variant="h6" className={style.title}>
          Crack Inventory System
        </Typography>
        <Button color="secondary" variant="contained">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
