import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Box, Grid } from "@mui/material/";
import { useParams } from "react-router-dom";
import { findEmployeeSalaryApi } from "../../../../Api/SalaryPaymentModule/EmployeeSalaryApi/findEmployeeSalaryApi";
import { styled } from "@mui/material/styles";
import useStyles from "./FindEmployeeSalaryStyles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#26a69a",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e0f2f1",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#b2ebf2",
  },
  "&:hover": {
    backgroundColor: "#fafafa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function FindEmployeeSalary({ user }) {
  const classes = useStyles();
  const [employeeSalaryList, setEmployeeSalaryList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const { EmployeeID } = useParams();

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.employeeID !== EmployeeID) {
      window.location.href = "/dashboard";
    }
  }

  useEffect(() => {
    async function fetchData() {
      setEmployeeSalaryList(await findEmployeeSalaryApi(EmployeeID));
    }
    fetchData();
  }, [EmployeeID]);

  useEffect(() => {
    setFilteredRecords(
      employeeSalaryList.filter(
        (record) =>
          record.EmployeeID.toLowerCase().includes(search.toLowerCase()) ||
          record.Month.toLowerCase().includes(search.toLowerCase()) ||
          record.Year.toString().includes(search.toString())
      )
    );
  }, [search, employeeSalaryList]);

  return (
    <div>
      <Box className={classes.Box}>
        <Typography className={classes.topic}>
          Previous Salary Details of {EmployeeID} - DirectFN Ltd.
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
                  className={classes.button}
                  onClick={() =>
                    window.open(`/salary/employeeSalary/${EmployeeID}`, "_self")
                  }
                >
                  My Salary sheet
                </Button>
                <input
                  className={classes.search}
                  type="text"
                  placeholder="Search "
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <br />
            </Grid>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 700, paddingLeft: 50 }}
                aria-label="customized table"
              >
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
