import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import moment from "moment";
import * as actionCreator from "../../store/actions";
import style from "./CrackInfo.module.css";
const CrackInfo = ({
  crackInfo,
  getCrackInfo,
  resetCrackInfo,
  match: {
    params: { crackId },
  },
}) => {
  useEffect(() => {
    getCrackInfo(crackId);

    return () => {
      resetCrackInfo();
    };
  }, [getCrackInfo, crackId, resetCrackInfo]);
  if (!crackInfo) {
    return (
      <div className={style.loading}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={style.crackInfo}>
        <div className={style.crackInfo_body}>
          <Grid component={Card} className={style.card}>
            <CardHeader title="Crack Info" />
            <CardContent className={style.cardContent}>
              <Typography variant="h6">
                Structure Name: {crackInfo.name}
              </Typography>
              <Typography>Location: {crackInfo.location}</Typography>
              <Typography>Author: {crackInfo.author}</Typography>
              <Typography>Entry Date: { (crackInfo?.timestamp) ? moment(crackInfo.timestamp.toDate()).format('MMMM D YYYY') : "Loading..."}</Typography>
              <img src={crackInfo.photoURL} alt="Crack_Image" />
              <Typography>
                Recommendation: {crackInfo.recommendation}
              </Typography>
            </CardContent>
          </Grid>
        </div>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    crackInfo: state.crack.crackInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCrackInfo: (id) => dispatch(actionCreator.getCrackInfo(id)),
    resetCrackInfo: () => dispatch(actionCreator.resetCrackInfo()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CrackInfo);
