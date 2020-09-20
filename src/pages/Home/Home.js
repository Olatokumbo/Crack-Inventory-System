import React, {useState} from "react";
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
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import EntryModal from "../../components/EntryModal/EntryModal";
import style from "./Home.module.css";
const Home = () => {
  const products = [];
  const [modalState, setModalState] = useState(false);
  const openModal = ()=>{
    setModalState(true);
  }
  const closeModal =(value)=>{
    setModalState(!value);
  }
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
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">Entry Date</TableCell>
                    <TableCell align="right">Author</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell component="th" scope="row">
                        {data.name}
                      </TableCell>
                      <TableCell align="right">${data.price}</TableCell>
                      <TableCell align="right">{data.quantity}</TableCell>
                      <TableCell align="right">{data.category}</TableCell>
                      <TableCell align="right">
                        <Link to={`/edit/product/${data.id}`}>
                          <IconButton color="primary">
                            <EditIcon />
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

export default Home;
