import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, Box } from "@mui/material/";
import { Grid } from "@mui/material";
import { displayFeedbackApi } from "../../../../Api/PromotionModule/SubmissionApi/displayFeedbackApi";
import { displayPaperApi } from "../../../../Api/PromotionModule/SubmissionApi/displayPaperApi";
import useStyles from "./DisplayFeedbackStyles";
import { styled } from "@mui/material/styles";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Tooltip from "@mui/material/Tooltip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#183d78",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e0e0e0",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#e1f5fe",
  },
  "&:hover": {
    backgroundColor: "#fafafa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DisplayMyFeedback = ({ user }) => {
  const classes = useStyles();
  const { EmployeeID } = useParams();
  const [mysubmissionList, setmysubmissionList] = useState([]);
  const [isPaper, setIsPaper] = useState([]);

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.employeeID !== EmployeeID) {
      window.location.href = "/dashboard";
    } else if (user.jobRole === "CTO") {
      window.location.href = "/dashboard";
    } else if (user.jobRole === "IT Employee") {
      window.location.href = "/dashboard";
    }
  }


  // useEffect(() => {
  //   async function fetchData() {
  //     setPaper(await displayPaperApi(EmployeeID));
  //   }
  //   fetchData();
  // }, [EmployeeID]);
  console.log("isPaper", isPaper);
  useEffect(() => {
    async function fetchData() {
      setmysubmissionList(await displayFeedbackApi(EmployeeID));
      console.log("data loaded from mysubmissions - frontend");
    }
    fetchData();
  }, [EmployeeID]);

  console.log("mysubmissions - frontend", mysubmissionList);
  return (
    <div>
      {mysubmissionList.length === 0 ? (
        <div>
          <Box className={classes.Box}>
            <Typography className={classes.topic}>
              My submissions : {EmployeeID}
            </Typography>

            <Grid container sx={{ p: 4 }}>
              <Grid className={classes.text}>
                <Typography className={classes.content}>
                  You have not done any submission yet.
                </Typography>
                <Typography className={classes.content2}>
                  Try out here!
                </Typography>
                <Grid className={classes.testBtn2}>
                  <Tooltip
                    title=" Try out new Evaluation tests here"
                    placement="bottom"
                  >
                    <Button
                      variant="contained"
                      onClick={() =>
                        window.open(
                          ` /promotion/Paper/${EmployeeID}`,
                          "_blank",
                          "Popup"
                        )
                      }
                    >
                      <HistoryEduIcon /> &nbsp; New Evaluation Test
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
        <div>
          <Box className={classes.Box}>
            <Grid className={classes.testBtn}>
              <Tooltip
                title=" Try out new Evaluation tests here"
                placement="bottom"
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    window.open(
                      ` /promotion/Paper/${EmployeeID}`,
                      "_blank",
                      "Popup"
                    )
                  }
                >
                  <HistoryEduIcon /> &nbsp; New Evaluation Test
                </Button>
              </Tooltip>
            </Grid>
            <Typography className={classes.topic}>
              My submissions : {EmployeeID}
            </Typography>
            <Grid container sx={{ p: 4 }}>
              <Grid
                item
                sm={12}
                md={12}
                sx={{
                  mt: 2,
                }}
              >
                <TableContainer component={Paper} className={classes.paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">
                          Date Attempted
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          TeamLead ID
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Date Of Evaluation
                        </StyledTableCell>
                        <StyledTableCell align="left">Feedback</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mysubmissionList.map((record, idx) => (
                        <StyledTableRow key={idx}>
                          <StyledTableCell align="left">
                            {record.DateAttempted}
                          </StyledTableCell>
                          {record.TeamLeadID ? (
                            <StyledTableCell align="left">
                              {record.TeamLeadID}
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell
                              align="left"
                              sx={{ color: "red", fontWeight: "bold" }}
                            >
                              Pending
                            </StyledTableCell>
                          )}

                          {record.Feedback ? (
                            <StyledTableCell align="left">
                              {record.DateOfEvaluation}
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell
                              align="left"
                              sx={{ color: "red", fontWeight: "bold" }}
                            >
                              Pending
                            </StyledTableCell>
                          )}

                          {record.Feedback ? (
                            <StyledTableCell align="left">
                              {record.Feedback}
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell
                              align="left"
                              sx={{ color: "red", fontWeight: "bold" }}
                            >
                              Pending
                            </StyledTableCell>
                          )}
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </div>
  );
};
export default DisplayMyFeedback;
