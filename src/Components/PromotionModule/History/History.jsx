import { AddReaction } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPromotionHistory } from "../../../Api/PromotionModule/PromotionApi/PromotionApi";
import { StyledTableCell, StyledTableRow, useStyles } from "./HistoryStyles";

const History = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [promotionHistory, setPromotionHistory] = useState(null);
  const fetchData = async () => {
    setPromotionHistory(await getPromotionHistory());
  };
  useEffect(() => {
    fetchData();
  }, []);
  const classes = useStyles();
  return (
    <Box className={classes.Box}>
      <Grid container>
        <Grid md={6} item className={classes.header}>
          <Typography variant="h5">Promotion History List</Typography>
        </Grid>
        <Grid md={6} item className={classes.button}>
         {user.jobRole === "CTO" && ( <Button
            component={Link}
            to={"/promotions/promoteEmployees"}
            variant="contained"
            color="primary"
            startIcon={<AddReaction  />}
          >
            
            Promote
          </Button>)}
        </Grid>
      </Grid>
      <Grid container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Employee</StyledTableCell>
                <StyledTableCell align="center">Promoted Date</StyledTableCell>
                <StyledTableCell align="center">EValuator</StyledTableCell>
                <StyledTableCell align="center">
                  Previous Position
                </StyledTableCell>
                <StyledTableCell align="center">New Position</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promotionHistory &&
                promotionHistory.map((history) => (
                  <StyledTableRow key={history._id}>
                    <StyledTableCell align="center">
                      <Grid className={classes.cellContent}>
                        <Avatar  src={history.employeePic} />
                        <Typography variant="h6">
                          {history.employeeName}
                        </Typography>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Grid className={classes.cellContent}>
                        <Typography variant="h6">
                          {new Date(history.promotedDate).toDateString()}
                        </Typography>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Grid className={classes.cellContent}>
                        <Avatar src={history.teamLeadPic} />
                        <Typography variant="h6">
                          {history.teamLeadName}
                        </Typography>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Grid className={classes.cellContent}>
                        <Typography variant="h6">
                          {history.previousPosition}
                        </Typography>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Grid className={classes.cellContent}>
                        <Typography variant="h6">
                          {history.newPosition}
                        </Typography>
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
};

export default History;
