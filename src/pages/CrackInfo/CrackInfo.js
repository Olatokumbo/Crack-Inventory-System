import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions";
import style from "./CrackInfo.module.css";
const CrackInfo = ({
  crackInfo,
  getCrackInfo,
  match: {
    params: { crackId },
  },
}) => {
  useEffect(() => {
    getCrackInfo(crackId);
  }, [getCrackInfo, crackId]);
  return (
    <div className={style.crackInfo}>
      <div className={style.crackInfo_body}>
        <Grid component={Card} className={style.card}>
          <CardHeader
            title="Crack Info"
            />
          <CardContent className={style.cardContent}>
          <Typography variant="h6">Structure Name: {crackInfo.name}</Typography>
          <Typography>Location: {crackInfo.location}</Typography>
          <Typography>Author: {crackInfo.author}</Typography>
          <img src={crackInfo.photoURL} alt="Crack_Image"/>
          <Typography>Recommendation: {crackInfo.recommendation}</Typography>
          </CardContent>
        </Grid>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    crackInfo: state.crack.crackInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCrackInfo: (id) => dispatch(actionCreator.getCrackInfo(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CrackInfo);
