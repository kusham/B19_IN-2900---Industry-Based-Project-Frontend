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
import useStyles from "./DisplayTeamMemberSubmissionsStyles";
import { styled } from "@mui/material/styles";
import { displayTeamMemberSubmissionsApi } from "../../../../Api/PromotionModule/EvaluateApi/displayTeamMemberSubmissionsApi";

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

const DisplayTeamMemberSubmissions = ({ user }) => {
  const classes = useStyles();
  const [mysubmissionList, setmysubmissionList] = useState([]);

  const { EmployeeID } = useParams();

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.teamLead === false) {
      window.location.href = "/dashboard";
    } else if (user.employeeID !== EmployeeID) {
      window.location.href = "/dashboard";
    }
  }

  useEffect(() => {
    async function fetchData() {
      setmysubmissionList(await displayTeamMemberSubmissionsApi(EmployeeID));
      console.log("data loaded from TeamLead submissions - frontend");
    }
    fetchData();
  }, [EmployeeID]);
  console.log("data", mysubmissionList);
  return (
    <div>
      {mysubmissionList == null ? (
        <div>
          <Box className={classes.Box}>
            <Typography className={classes.topic}>
              Evaluation Test - Team Member Submissions
            </Typography>

            <Grid container sx={{ p: 4 }}>
              <Grid className={classes.text}>
                <Typography className={classes.content}>
                  Your Team Members not have done any submission yet.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
        <div>
          <Box className={classes.Box}>
            <Typography className={classes.topic}>
              Evaluation Test - Team Member Submissions
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
                          Employee ID
                        </StyledTableCell>
                        <StyledTableCell align="left">Paper ID</StyledTableCell>
                        <StyledTableCell align="left">
                          Date Attempted
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          TeamLead ID
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Feed back
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Date Of Evaluation
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Evaluate
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mysubmissionList.map((record, idx) => (
                        <StyledTableRow key={idx}>
                          <StyledTableCell align="left">
                            {record.EmployeeID}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {record.PaperID}
                          </StyledTableCell>
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
                          {record.DateOfEvaluation ? (
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
                          <StyledTableCell align="center">
                            {record.DateOfEvaluation == null ? (
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "#183d78" }}
                                onClick={() =>
                                  window.open(
                                    ` /promotion/evaluation/evaluatePaper/${EmployeeID}/${record.EmployeeID}/${record.PaperID}`,
                                    "_self"
                                  )
                                }
                              >
                                Evaluate&nbsp;
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                disabled
                                sx={{ backgroundColor: "#183d78" }}
                              >
                                Evaluated&nbsp;
                              </Button>
                            )}
                          </StyledTableCell>
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
export default DisplayTeamMemberSubmissions;
