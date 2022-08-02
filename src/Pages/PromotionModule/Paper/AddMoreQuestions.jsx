import React from "react";
import AddMoreQuestions from "../../../Components/PromotionModule/Paper/AddMoreQuestions/AddMoreQuestions";
import { Grid } from "@mui/material";

const AddMoreQuestionsForm = ({ user }) => {
  return (
    <Grid container>
      <Grid item sm={12} md={12}>
        <AddMoreQuestions user={user} />
      </Grid>
    </Grid>
  );
};

export default AddMoreQuestionsForm;
