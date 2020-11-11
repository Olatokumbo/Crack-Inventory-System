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
  TextField,
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from "react-router-dom";
import EntryModal from "../../components/EntryModal/EntryModal";
import { connect } from "react-redux";
import {useHistory} from "react-router-dom"
import * as actionCreator from "../../store/actions";
import moment from "moment";

import style from "./Home.module.css";
const Home = ({getCracks, cracks, searchCracks}) => {
  const history = useHistory();
  const [modalState, setModalState] = useState(false);
  const [query, setQuery] = useState("");

  const openModal = ()=>{
    setModalState(true);
  }
  const closeModal =(value)=>{
    setModalState(!value);
  }
  const search = async (e) =>{
    e.preventDefault();
   searchCracks(query);
  }
  const reset = () =>{
    getCracks();
    setQuery("");
  }
  useEffect(()=>{
    getCracks()
  },[getCracks])
  return (
    <div className={style.home}>
      <div className={style.home_body}>
        <div className={style.actions}>
        <Button size="large" color="primary" variant="contained" className={style.addButton} onClick={openModal}>
          Add Data
        </Button>
        <form onSubmit={search}>
        <Button size="small" color="secondary" variant="contained" className={style.addButton} onClick={reset}>
        Reset
      </Button>
        <TextField label="Search" name="search" value={query} variant="outlined" size="small" onChange={(e)=>setQuery(e.target.value)}/>
        <Button type="submit" size="large" variant="outlined">Go</Button>
        </form>
        </div>
        <Card style={{margin: 10}}>
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
                  {cracks.length >0 ? cracks.map((data) => (
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
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )): <Typography className={style.noResults}>No Results Found</Typography>}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
      <Button onClick={() => history.push('/settings')}>...</Button>
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
    getCracks: ()=> dispatch(actionCreator.getCracks()),
    searchCracks: (crack)=> dispatch(actionCreator.searchCracks(crack))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
