import React from "react";
import CreatePaper from "../../../Components/PromotionModule/Paper/CreatePaper/CreatePaper";
import { Grid } from "@mui/material";

const CreateNewPaper = ({ user }) => {
  return (
    <Grid container>
      <Grid item sm={12} md={12}>
        <CreatePaper user={user} />
      </Grid>
    </Grid>
  );
};

export default CreateNewPaper;
