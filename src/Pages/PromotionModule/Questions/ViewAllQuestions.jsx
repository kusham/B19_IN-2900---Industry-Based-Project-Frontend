import React from "react";
import ViewAllQuestionsTable from "../../../Components/PromotionModule/Question/ViewAllQuestionsTable/ViewAllQuestionsTable";
import { Grid } from "@mui/material";

const ViewAllQuestions = ({ user }) => {
  return (
    <Grid container>
      <Grid item sm={12}>
        <ViewAllQuestionsTable user={user} />
      </Grid>
    </Grid>
  );
};

export default ViewAllQuestions;
