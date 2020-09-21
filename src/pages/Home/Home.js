import React, {useState, useEffect} from "react";
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Card,
  CardContent,
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from "react-router-dom";
import EntryModal from "../../components/EntryModal/EntryModal";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions";
import moment from "moment";
import style from "./Home.module.css";
const Home = ({getCracks, cracks}) => {
  const [modalState, setModalState] = useState(false);
  const openModal = ()=>{
    setModalState(true);
  }
  const closeModal =(value)=>{
    setModalState(!value);
  }

  useEffect(()=>{
    getCracks()
  },[getCracks])
  return (
    <div className={style.home}>
      <div className={style.home_body}>
        <Button size="large" color="primary" variant="contained" className={style.addButton} onClick={openModal}>
          Add Data
        </Button>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h6">
              Database
            </Typography>
            <TableContainer component={Paper} className={style.tableContainer}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Structure Name</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Entry Date</TableCell>
                    <TableCell align="center">Author</TableCell>
                    <TableCell align="center">View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cracks.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell component="th" scope="row">
                        {data.name}
                      </TableCell>
                      <TableCell align="center">{data.location}</TableCell>
                      <TableCell align="center">{ (data?.timestamp) ? moment(data.timestamp.toDate()).format('dddd MMMM D YYYY') : "Loading..."}</TableCell>
                      <TableCell align="center">{data.author}</TableCell>
                      <TableCell align="center">
                        <Link to={`/crack/${data.id}`}>
                          <IconButton color="primary">
                            <VisibilityIcon />
                          </IconButton>{" "}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
      <EntryModal modalState={modalState} closeModal={closeModal}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cracks: state.crack.cracks,
  };
};

const mapDispatchToProps = (dispatch)=>{
  return{
    getCracks: ()=> dispatch(actionCreator.getCracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
