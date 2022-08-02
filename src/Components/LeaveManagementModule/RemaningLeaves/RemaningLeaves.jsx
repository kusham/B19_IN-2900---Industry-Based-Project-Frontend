import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { getLeaveBalance } from "../../../Api/LeaveManagementModule/LeaveApi";
import useStyles from "./RemainingLeavesStyle";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LuggageIcon from "@mui/icons-material/Luggage";

const RemaningLeaves = ({leaveBalance}) => {
  
  
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.title} variant="h5">
        Remaining Leaves
      </Typography>
      <Grid container spacing={3} sx={{ ml: 1, mr: 8, mb: 3 }}>
        <Grid item md={3.9}>
          <Card elevation={6} className={classes.card1}>
            <Grid container>
              <Grid item md={8} className={classes.cardText}>
                <Typography variant="h2">
                  {leaveBalance.remainingAnnual &&
                  leaveBalance.remainingAnnual < 10
                    ? "0" + leaveBalance.remainingAnnual
                    : leaveBalance.remainingAnnual}
                </Typography>
                <Typography>Annual Leave</Typography>
              </Grid>
              <Grid item md={4} className={classes.cardIcon}>
                <LuggageIcon />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={3.9}>
          <Card elevation={6} className={classes.card2}>
            <Grid container>
              <Grid item md={8}>
                <Typography variant="h2">
                  {leaveBalance.remainingCasual && leaveBalance.remainingCasual<10 ? "0"+leaveBalance.remainingCasual:leaveBalance.remainingCasual}
                </Typography>
                <Typography>Casual Leave</Typography>
              </Grid>
              <Grid item md={4} className={classes.cardIcon}>
                <TimeToLeaveIcon />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={3.9}>
          <Card elevation={6} className={classes.card3}>
            <Grid container>
              <Grid item md={8}>
                <Typography variant="h2">
                  {leaveBalance.remainingMedical &&
                    leaveBalance.remainingMedical<10 ? "0"+leaveBalance.remainingMedical:leaveBalance.remainingMedical}
                </Typography>
                <Typography>Medical Leave</Typography>
              </Grid>
              <Grid item md={4} className={classes.cardIcon}>
                <MedicalServicesIcon />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RemaningLeaves;
