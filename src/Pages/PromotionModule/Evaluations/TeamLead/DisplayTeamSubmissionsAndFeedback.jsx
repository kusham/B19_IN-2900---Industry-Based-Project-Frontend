import React from "react";
import DisplayTeamMemberSubmissions from "../../../../Components/PromotionModule/Evaluation/DisplayTeamMemberSubmissions/DisplayTeamMemberSubmissions";
import { Grid } from "@mui/material";

const DisplayTeamSubmissionsAndFeedback = ({ user }) => {
  return (
    <Grid container>
      <Grid item sm={12} md={12}>
        <DisplayTeamMemberSubmissions user={user} />
      </Grid>
    </Grid>
  );
};

export default DisplayTeamSubmissionsAndFeedback;
