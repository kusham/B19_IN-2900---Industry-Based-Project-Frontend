import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Box } from "@mui/material/";
import { Grid } from "@mui/material";
import { deleteCurrentSalaryApi } from "../../../../Api/SalaryPaymentModule/CurruntSalaryApi/deleteCurrentSalaryApi";
import { viewCurruntSalaryApi } from "../../../../Api/SalaryPaymentModule/CurruntSalaryApi/viewCurruntSalaryApi";
import { viewSalaryRatesApi } from "../../../../Api/SalaryPaymentModule/SalaryRatesApi/viewSalaryRatesApi";
import { viewAllEmployees } from "../../../../Api/ReportersManagementModule/EmployeeApi";
import { styled } from "@mui/material/styles";
import useStyles from "./ViewCurruntSalaryTableStyles";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
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

export default function ViewCurruntSalaryTable({ user }) {
  const classes = useStyles();
  const [curruntSalaryList, setCurruntSalaryList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [rates, setRates] = useState([]);

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.jobRole !== "HR Manager") {
      window.location.href = "/dashboard";
    }
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     setCurruntSalaryList(await viewCurruntSalaryApi());
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await viewCurruntSalaryApi();
      const descending = res.sort((a, b) =>
        a.EmployeeID < b.EmployeeID ? -1 : 1
      );
      setCurruntSalaryList(descending, curruntSalaryList);
      console.log(descending);
    }
    fetchData();
  }, []);

  //----------------------------------------
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setProfiles(await viewAllEmployees());
    }
    fetchData();
  }, []);

  const filteredEmps = profiles.filter((emp) => emp.user.status !== "Resign");
  console.log("empsNotResigned", filteredEmps);
  //-------------------------------------------

  useEffect(() => {
    setFilteredRecords(
      curruntSalaryList.filter((record) =>
        record.EmployeeID.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, curruntSalaryList]);

  useEffect(() => {
    async function fetchData() {
      const result = await viewSalaryRatesApi();
      setRates(result[result.length - 1], rates);
    }
    fetchData();
  }, []);

  //console.log("rates", rates);

  return (
    <div>
      <Box className={classes.Box}>
        <Typography className={classes.topic}>
          Currunt Salary Details - DirectFN Ltd.
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
            <Grid>
              <div style={{ marginLeft: 10 }}>
                <Button
                  align="center"
                  variant="contained"
                  component={Link}
                  to={"currentSalary/create"}
                 // onClick={() => window.open("currentSalary/create", "_self")}
                >
                  Create New
                </Button>
                <input
                  type="text"
                  placeholder="Search by EmployeeID"
                  className={classes.search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <br />
            </Grid>
            <Grid container marginBottom={1}>
              <Grid item xs={12} align="right">
                <Typography className={classes.ratesfont}>
                  <i>( Rates: </i>
                  <i>Employee EPF : {rates.EmoloyeeEpfRate}</i>|
                  <i>Company EPF : {rates.CompanyEPFRate}</i>|
                  <i>ETF : {rates.ETFRate} )</i>
                </Typography>
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">EmployeeID</StyledTableCell>
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
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecords.map((record, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell align="left">
                        {record.EmployeeID}
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

                      {filteredEmps.find(
                        (element) =>
                          element.user.employeeID === record.EmployeeID
                      ) ? (
                        <StyledTableCell align="center">
                          <Button
                            sx={{
                              maxWidth: "60px",
                              maxHeight: "30px",
                              padding: 2,
                            }}
                            variant="contained"
                            onClick={() =>
                              window.open(
                                `/salary/currentSalary/update/${record.EmployeeID}`,
                                "_self"
                              )
                            }
                          >
                            Edit
                          </Button>
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell align="center">
                          <Button
                            sx={{
                              maxWidth: "60px",
                              maxHeight: "30px",
                              padding: 2,
                              backgroundColor: "red",
                            }}
                            variant="contained"
                            onClick={() => {
                              deleteCurrentSalaryApi(record.EmployeeID);
                              window.location.reload(false);
                            }}
                          >
                            Delete
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
