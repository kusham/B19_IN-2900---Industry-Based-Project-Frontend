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
import { viewSalaryRatesApi } from "../../../../Api/SalaryPaymentModule/SalaryRatesApi/viewSalaryRatesApi";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import useStyles from "./ViewSalaryRatesTableStyles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00acc1",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(1) ": {
    borderTop: "3px solid #ad1457",
    borderBottom: "3px solid #ad1457",
    backgroundColor: "#f48fb1",
  },
  "&:nth-of-type(2n+3)": {
    backgroundColor: "#b2dfdb",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#e0f2f1",
  },
  "&:hover": {
    backgroundColor: "#fafafa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewSalaryRatesTable({ user }) {
  const { EmployeeID } = useParams();
  const classes = useStyles();
  const [ratesList, setRatesList] = useState([]);

  if (!user) {
    window.location.replace("/");
  } else {
    if (user.jobRole !== "HR Manager") {
      window.location.href = "/dashboard";
    }
  }
  // useEffect(() => {
  //   async function fetchData() {
  //     setRatesList(await viewSalaryRatesApi());
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await viewSalaryRatesApi();
      const descending = res.sort((a, b) =>
        a.ChangedDate > b.ChangedDate ? -1 : 1
      );
      setRatesList(descending, ratesList);
      console.log(descending);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Box className={classes.Box}>
        <Typography className={classes.topic}>Salary Rates</Typography>
        <Grid container sx={{ p: 4 }}>
          <Grid
            item
            sm={12}
            md={12}
            sx={{
              mt: 2,
            }}
          >
            <Grid className={classes.btngrid}>
              <div style={{ marginLeft: 10 }}>
                <Button
                  className={classes.button}
                  align="center"
                  variant="contained"
                  onClick={() =>
                    window.open(
                      `/salary/salaryPercentages/create/${EmployeeID}`,
                      "_self"
                    )
                  }
                >
                  Enter New Rates
                </Button>
              </div>
              <br />
            </Grid>
            <TableContainer component={Paper} className={classes.paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Entered Date</StyledTableCell>
                    <StyledTableCell align="left">Changed BY</StyledTableCell>
                    <StyledTableCell align="left">
                      Emoloyee EPF Rate
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Company EPF Rate
                    </StyledTableCell>
                    <StyledTableCell align="left">ETF Rate</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratesList.map((r, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell align="left">
                        {r.ChangedDate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {r.ChangedBY}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {r.EmoloyeeEpfRate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {r.CompanyEPFRate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {r.ETFRate}
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
