import React from "react";
import AllSubmissionsTable from "../../../Components/PromotionModule/Evaluation/AllSubmissionsTable/AllSubmissionsTable";
import { Grid } from "@mui/material";

const ViewAllPapersDelete = ({ user }) => {
  return (
    <Grid container>
      <Grid item sm={12} md={12}>
        <AllSubmissionsTable user={user} />
      </Grid>
    </Grid>
  );
};

export default ViewAllPapersDelete;
