import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  CircularProgress,
  Button,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { connect } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import * as actionCreator from "../../store/actions";
import style from "./CrackInfo.module.css";
const CrackInfo = ({
  crackInfo,
  getCrackInfo,
  resetCrackInfo,
  deleteCrackInfo,
  match: {
    params: { crackId },
  },
}) => {
  const history = useHistory();
  const deleteEntry = () => {
    deleteCrackInfo(crackId);
    history.push("/home");
  };
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
            <div className={style.header}>
              <CardHeader title="Crack Info" />
              <Button
                color="secondary"
                variant="contained"
                className={style.deleteBtn}
                onClick={deleteEntry}
              >
                Delete
              </Button>
            </div>
            <CardContent className={style.cardContent}>
              <Typography variant="h6">
                Structure Name: {crackInfo.name}
              </Typography>
              <Typography>Location: {crackInfo.location}</Typography>
              <Typography>Author: {crackInfo.author}</Typography>
              <Typography>
                Entry Date:{" "}
                {crackInfo?.timestamp
                  ? moment(crackInfo.timestamp.toDate()).format("MMMM D YYYY")
                  : "Loading..."}
              </Typography>
              <Carousel autoPlay={false} className={style.CarouselItem}>
                {crackInfo.photoUrl.map((data) => (
                  <img className={style.crackPhoto} src={data} alt="crack" />
                ))}
              </Carousel>
              <Typography>Remarks: {crackInfo.recommendation}</Typography>
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
    deleteCrackInfo: (id) => dispatch(actionCreator.removeCrackInfo(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CrackInfo);
