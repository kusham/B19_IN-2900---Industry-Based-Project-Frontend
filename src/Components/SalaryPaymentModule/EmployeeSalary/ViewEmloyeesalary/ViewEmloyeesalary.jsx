import React, { useState, useEffect } from "react";
import { Box, Grid, Card, Typography, Divider, Button } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";
import { useParams } from "react-router-dom";
import { viewEmployeeSalaryApi } from "../../../../Api/SalaryPaymentModule/EmployeeSalaryApi/viewEmployeeSalaryApi";
import useStyles from "./ViewEmloyeesalaryStyles";
import { Link } from "react-router-dom";

export default function ViewEmloyeesalary({ user }) {
  const classes = useStyles();
  const [employeeSalaryList, setEmployeeSalaryList] = useState([]);
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
      setEmployeeSalaryList(await viewEmployeeSalaryApi(EmployeeID));
    }
    fetchData();
  }, [EmployeeID]);
  //console.log("--", employeeSalaryList);

  return (
    <div>
      <Box className={classes.Box}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          justifyContent="center"
        >
          <Grid item xs={5}>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12} align="center">
                <Typography className={classes.topic}>Salary Sheet</Typography>
              </Grid>
            </Grid>
            {employeeSalaryList.map((salary, key) => (
              <Card className={classes.card} key={key}>
                <Typography variant="h6" sx={{ color: "#795548" }}>
                  <PaidSharpIcon />
                  &nbsp;{" "}
                  {new Date().toLocaleString("default", { month: "long" })}{" "}
                  {new Date().getFullYear()}
                </Typography>
                <Grid container spacing={2} columns={12} mt={2}>
                  <Grid item xs={3}>
                    <Typography className={classes.name}>
                      Employee ID :
                    </Typography>
                  </Grid>
                  <Grid item xs={2} align="left">
                    <Typography className={classes.namevalue}>
                      {salary.EmployeeID}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 2, mb: 1 }}></Divider>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={4}>
                    <Typography className={classes.name}>
                      Basic Salary
                    </Typography>
                  </Grid>
                  <Grid item xs={7} align="right">
                    <Typography className={classes.namevalue}>
                      {salary.BasicSalary}.00
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                <Typography className={classes.middle}>Allowances</Typography>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={4}>
                    <Typography className={classes.name}>
                      Internet Allowance
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={7} align="right">
                    <Typography className={classes.namevalue}>
                      {salary.InternetAllowance}.00
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={4}>
                    <Typography className={classes.name}>
                      Vehicle Allowance
                    </Typography>
                  </Grid>
                  <Grid item xs={7} align="right">
                    <Typography className={classes.namevalue}>
                      {salary.VehicleAllowance}.00
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                <Typography className={classes.middle}>Deductions</Typography>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={4}>
                    <Typography className={classes.name}>
                      Employee EPF
                    </Typography>
                  </Grid>
                  <Grid item xs={7} align="right">
                    <Typography className={classes.namevalue}>
                      {salary.EmoloyeeEpf}.00
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                <Typography className={classes.middle}>
                  Company Deductions
                </Typography>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={4}>
                    <Typography className={classes.name}>
                      Company EPF
                    </Typography>
                  </Grid>
                  <Grid item xs={7} align="right">
                    <Typography className={classes.namevalue}>
                      {salary.CompanyEPF}.00
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={4}>
                    <Typography className={classes.name}>ETF</Typography>
                  </Grid>
                  <Grid item xs={7} align="right">
                    <Typography className={classes.namevalue}>
                      {salary.ETF}.00
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={4}>
                    <Typography className={classes.net}>Net Salary</Typography>
                  </Grid>
                  <Grid item xs={7} align="right">
                    <Typography className={classes.netVal}>
                      {salary.NetSalary}.00
                    </Typography>
                  </Grid>
                  <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                </Grid>
              </Card>
            ))}
            <Grid item xs={12} align="center" mt={2}>
              <Button
              
               component={Link}
               to={`${EmployeeID}/previous`}
                className={classes.button}
                //onClick={() => window.open(`${EmployeeID}/previous`, "_self")}
              >
                View Previous records&nbsp;
                <ArrowForwardIosSharpIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box> 
    </div>
  );
}
