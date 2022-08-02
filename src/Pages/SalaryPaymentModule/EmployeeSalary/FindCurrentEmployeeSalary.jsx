import React from "react";
import FindEmployeeSalary from "../../../Components/SalaryPaymentModule/EmployeeSalary/FindEmployeeSalary/FindEmployeeSalary";
import { Grid } from "@mui/material";

const FindCurrentEmployeeSalary = ({ user }) => {
  return (
    <Grid container>
      <Grid item sm={12} md={12}>
        <FindEmployeeSalary user={user} />
      </Grid>
    </Grid>
  );
};

export default FindCurrentEmployeeSalary;
