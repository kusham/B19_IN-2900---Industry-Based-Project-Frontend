import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Button, Box } from "@mui/material/";
import { Grid } from "@mui/material";
import { viewAllQuestionsApi } from "../../../../Api/PromotionModule/QuestionApi/viewAllQuestionsApi";
import { styled } from "@mui/material/styles";
import useStyles from "./ViewAllQuestionsTableStyles";

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

export default function ViewAllQuestionsTable({ user }) {
  const classes = useStyles();
  const [QuestionList, setQuestionList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  //console.log(user);
  if (!user) {
    window.location.replace("/");
  } else {
    if (user.teamLead === false) {
      window.location.href = "/dashboard";
    }
  }

  useEffect(() => {
    async function fetchData() {
      setQuestionList(await viewAllQuestionsApi());
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRecords(
      QuestionList.filter((question) =>
        question.QuestionCatogory.includes(search)
      )
    );
  }, [search, QuestionList]);

  return (
    <div>
      <Box className={classes.Box}>
        <Typography className={classes.topic}>Question List</Typography>
        <Grid container sx={{ p: 4 }}>
          <Grid item sm={12} md={12}>
            <Grid item sm={12} md={12}>
              <div style={{ marginLeft: "37%", justifyContent: "center" }}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  onClick={() =>
                    window.open("/promotion/Questions/create", "_self")
                  }
                >
                  Create New
                </Button>
                {/* <input
                  type="text"
                  placeholder="Search by Q-Catogory"
                  className={classes.search}
                  onChange={(e) => setSearch(e.target.value)}
                /> */}
                <FormControl sx={{ ml: 10, minWidth: 120 }} size="small">
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
                    <MenuItem value="SSE">SSE</MenuItem>
                    <MenuItem value="BA">BA</MenuItem>
                    <MenuItem value="QA">QA</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="SE">SE</MenuItem>
                    <MenuItem value="UI/UX">UI/UX</MenuItem>
                    <MenuItem value="SA">SA</MenuItem>
                    <MenuItem value="TL">TL</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <br />
            </Grid>
            <TableContainer component={Paper} className={classes.paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Question ID</StyledTableCell>
                    <StyledTableCell align="left">
                      Question Catogory
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Question Body
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecords.map((question, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell align="left">
                        {question.QuestionID}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {question.QuestionCatogory}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {question.QuestionBody}
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
  );
}
