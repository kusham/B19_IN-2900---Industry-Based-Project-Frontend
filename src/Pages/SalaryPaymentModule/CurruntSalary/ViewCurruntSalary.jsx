import React from "react";
import ViewCurruntSalaryTable from "../../../Components/SalaryPaymentModule/CurruntSalary/ViewCurruntSalaryTable/ViewCurruntSalaryTable";

import { Grid } from "@mui/material";

const ViewCurruntSalary = ({ user }) => {
  return (
    <Grid container>
      <Grid item sm={12} md={12}>
        <ViewCurruntSalaryTable user={user} />
      </Grid>
    </Grid>
  );
};

export default ViewCurruntSalary;
