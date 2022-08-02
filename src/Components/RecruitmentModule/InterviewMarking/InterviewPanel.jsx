import { Paper, Grid, Typography, Divider, Avatar } from "@mui/material";
import React from "react";
import useStyles from "./MarkingStyles";

const InterviewPanel = ({ interview }) => {
  const classes = useStyles();
  return (
    <Paper sx={{ borderRadius: 4, mt: 3 }} elevation={4}>
      <Grid container className={classes.panelHead}>
        <Typography variant="h6" sx={{ mt: 1, mb: -1.5 }}>
          Interview Panel
        </Typography>
      </Grid>

      <Divider variant="middle" />
      <Grid container>
        {interview.Interviewers.map((interviewer) => (
          <Grid key={interviewer._id} item md={12} className={classes.panelMember}>
            <Avatar src={interviewer.profilePic} />
            <Typography sx={{ ml: 1 }} variant="body1">
              {interviewer.employeeFirstName +
                " " +
                interviewer.employeeLastName}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default InterviewPanel;
