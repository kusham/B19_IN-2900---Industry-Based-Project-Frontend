import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Grid, Box, Button } from "@mui/material";
import { viewSummarySalaryApi } from "../../../Api/SalaryPaymentModule/SummarySalaryApi/viewSummarySalaryApi";
import { styled } from "@mui/material/styles";
import useStyles from "./ViewSummarySalaryTableStyles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ab47bc",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9fbe7",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#c5cae9",
  },
  "&:hover": {
    backgroundColor: "#fafafa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewSummarySalaryTable({ user }) {
  const classes = useStyles();
  const [summarySalaryList, setSummarySalaryList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.jobRole !== "HR Manager") {
      window.location.href = "/dashboard";
    }
  }

  useEffect(() => {
    async function fetchData() {
      setSummarySalaryList(await viewSummarySalaryApi());
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRecords(
      summarySalaryList.filter((record) =>
        record.EmployeeID.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, summarySalaryList]);

  useEffect(() => {
    setFilteredRecords(
      summarySalaryList.filter(
        (record) =>
          record.Month.toLowerCase().includes(selectMonth.toLowerCase()) &&
          record.Year.toString().includes(selectYear.toString())
      )
    );
  }, [selectYear, selectMonth, summarySalaryList]);

  // const exists = summarySalaryList.map((e) => e.EmployeeID);
  // console.log("eid", exists);

  // let empidfiltered = new Set();
  // exists.forEach((item) => {
  //   empidfiltered.add(item);
  // });

  // console.log("eid2", empidfiltered);

  return (
    <div>
      <Box className={classes.Box}>
        <Typography className={classes.topic}>
          Summary Salary Details - DirectFN Ltd.
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
            <Grid container spacing={2} width="80%" paddingBottom={3}>
              <Grid item xs={3}>
                <div style={{ marginLeft: 10 }}>
                  <input
                    className={classes.search}
                    type="text"
                    placeholder="Search by EmployeeID"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </Grid>
              {/* {search.length === 0 ? (
                <Grid item xs={3}>
                  <Button
                    className={classes.btn}
                    align="center"
                    variant="contained"
                    disabled
                  >
                    Reset
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={3}>
                  <Button
                    className={classes.btn}
                    align="center"
                    variant="contained"
                    onClick={() => setSearch("")}
                  >
                    Reset
                  </Button>
                </Grid>
              )} */}
              <Grid item xs={3}>
                <FormControl
                  sx={{
                    ml: 20,
                    width: "150px",
                  }}
                  size="small"
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Filter by Year
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selectYear}
                    label="Year"
                    className={classes.select}
                    onChange={(e) => setSelectYear(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="2021">2021</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  sx={{ ml: 10, minWidth: 120, width: "150px" }}
                  size="small"
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Filter by Month
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selectMonth}
                    label="Month"
                    onChange={(e) => setSelectMonth(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                    <MenuItem value="April">April</MenuItem>
                    <MenuItem value="May">May</MenuItem>
                    <MenuItem value="June">June</MenuItem>
                    <MenuItem value="July">July</MenuItem>
                    <MenuItem value="August">August</MenuItem>
                    <MenuItem value="September">September</MenuItem>
                    <MenuItem value="October">October</MenuItem>
                    <MenuItem value="November">November</MenuItem>
                    <MenuItem value="December">Decemebr</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {selectMonth.length === 0 && selectYear.length === 0 ? (
                <Grid item xs={3}>
                  <Button
                    className={classes.btn}
                    align="center"
                    variant="contained"
                    disabled
                  >
                    Reset
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={3}>
                  <Button
                    className={classes.btn}
                    align="center"
                    variant="contained"
                    onClick={() => [(setSelectMonth(""), setSelectYear(""))]}
                  >
                    Reset
                  </Button>
                </Grid>
              )}
            </Grid>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">EmployeeID</StyledTableCell>
                    <StyledTableCell align="left">Year</StyledTableCell>
                    <StyledTableCell align="left">Month</StyledTableCell>
                    <StyledTableCell align="left">Basic Salary</StyledTableCell>
                    <StyledTableCell align="left">Vehicle Alw.</StyledTableCell>
                    <StyledTableCell align="left">
                      Internet Alw.
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Emoloyee EPF
                    </StyledTableCell>
                    <StyledTableCell align="left">Net Salary</StyledTableCell>
                    <StyledTableCell align="left">Company EPF</StyledTableCell>
                    <StyledTableCell align="left">ETF</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecords.map((record, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell align="left">
                        {record.EmployeeID}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {record.Year}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {record.Month}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {record.BasicSalary}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {record.VehicleAllowance}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {record.InternetAllowance}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {record.EmoloyeeEpf}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {record.NetSalary}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {record.CompanyEPF}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {record.ETF}
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
