import React from "react";
import ViewSummarySalaryTable from "../../../Components/SalaryPaymentModule/SummarySalary/ViewSummarySalaryTable";
import { Grid } from "@mui/material";

const ViewSummarySalary = ({ user }) => {
  return (
    <Grid container>
      <Grid item sm={12} md={12} mt={0}>
        <ViewSummarySalaryTable user={user} />
      </Grid>
    </Grid>
  );
};

export default ViewSummarySalary;
