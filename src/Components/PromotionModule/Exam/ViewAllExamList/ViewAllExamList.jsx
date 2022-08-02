import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewAllExamsApi } from "../../../../Api/PromotionModule/ExamApi/viewAllExamsApi";
import { deleteScheduledExamApi } from "../../../../Api/PromotionModule/ExamApi/deleteScheduledExamApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Box } from "@mui/material/";
import FormControl from "@mui/material/FormControl";
import { Grid } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import useStyles from "./ViewAllExamListStyles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00BCD4",
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

export default function ViewAllExamList({ user }) {
  const classes = useStyles();
  const { EmployeeID } = useParams();

  const [search, setSearch] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [ExamsList, setExamsList] = useState([]);

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.jobRole !== "HR Manager") {
      window.location.href = "/dashboard";
    }
  }
  useEffect(() => {
    async function fetchData() {
      const res = await viewAllExamsApi();
      const descending = [...res].sort((a, b) =>
        a.Status > b.Status ? -1 : 1
      );
      setExamsList(descending, ExamsList);
      console.log(descending);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRecords(
      ExamsList.filter((element) => element.Status.includes(search))
    );
  }, [search, ExamsList]);

  return (
    <div>
      <Box className={classes.Box}>
        <Typography className={classes.topic}>Evaluation Exams</Typography>
        <Grid container sx={{ p: 4 }}>
          <Grid
            item
            sm={12}
            md={12}
            sx={{
              mt: 2,
            }}
          >
            <Grid>
              <div style={{ marginLeft: 10 }}>
                {user.jobRole === "HR Manager" && (
                  <Button
                    align="center"
                    variant="contained"
                    onClick={() =>
                      window.open(
                        ` /promotion/evaluation/exam/scheduleExam/${EmployeeID}`,
                        "_self"
                      )
                    }
                  >
                    Schedule New Exam&nbsp;
                  </Button>
                )}

                <FormControl
                  sx={{ display: "flex-end", minWidth: 120, ml: 5 }}
                  size="small"
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Filter
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={search}
                    label="Filter"
                    onChange={(e) => setSearch(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <br />
            </Grid>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Exam ID</StyledTableCell>
                    <StyledTableCell align="left">Exam Name</StyledTableCell>
                    <StyledTableCell align="left">Job Role</StyledTableCell>
                    <StyledTableCell align="left">
                      Date Scheduled
                    </StyledTableCell>
                    <StyledTableCell align="center">Paper ID</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecords.map((element, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell align="left">
                        {element.ExamID}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {element.ExamName}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {element.JobRole}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {element.DateScheduled}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {element.PaperID}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {element.Status}
                      </StyledTableCell>
                      {element.Status === "Completed" ? (
                        <StyledTableCell align="left">
                          <Button
                            className={classes.Button}
                            variant="contained"
                            disabled
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell align="left">
                          <Button
                            className={classes.Button}
                            variant="contained"
                            onClick={() => {
                              deleteScheduledExamApi(
                                EmployeeID,
                                element.ExamID
                              ).then(() => {
                                window.location.reload(false);
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      )}

                      {element.Status === "Completed" ? (
                        <StyledTableCell align="left">
                          <Button disabled variant="contained">
                            Update&nbsp;
                          </Button>
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell align="left">
                          <Button
                            variant="contained"
                            onClick={() =>
                              window.open(
                                ` /promotion/evaluation/exam/updateExam/${EmployeeID}/${element.ExamID}`,
                                "_self"
                              )
                            }
                          >
                            Update&nbsp;
                          </Button>
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
  );
}
