import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";

import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LuggageIcon from "@mui/icons-material/Luggage";
import useStyles from "./IncreaseEntitledLeavesStyles";
import { useState } from "react";
import IncreaseDialogBox from "../IncreaseDialogBox/IncreaseDialogBox";
import {  FastRewindTwoTone,HealingTwoTone,AccessibleTwoTone ,AirplanemodeActiveTwoTone} from "@mui/icons-material";





const IncreaseEntitledLeaves = ({ employee, leaveBalance, setLeaveBalance, render, setRender }) => {
  const [open, setOpen] = useState(false);
  const [leaveType, setLeaveType] = useState(null);
  const [popUp, setPopUp] = useState(null);

  const handleClickOpen = (type) => {
    setOpen(true);
    setLeaveType(type);
    setPopUp(true);
  };
  const classes = useStyles();
  // console.log(leaveBalance);
  return (
    <Box sx={{ mt: 2 }}>
      {!employee ? (
        <Grid
          container
          spacing={3}
          // sx={{ ml: 0, mr: 8, mb: 3,mt:2 }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: 700,
            ml: 8,
            // flexDirection: "column",
          }}
        >
          <Grid item md={12}>
            <Card className={classes.cardGuid}>
              <Grid container className={classes.textContainer}>
                <Grid item md={12}>
                  <Typography>
                    Do You Want to Increase Entitled Leaves?
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography>Select the Employee </Typography>
                </Grid>
                <Grid item md={12} className={classes.icon}>
                  <FastRewindTwoTone />
                  <LinearProgress color="error" className={classes.progressIcon}/>
                </Grid>
              </Grid>

             
            </Card>
          </Grid>
          <Grid container className={classes. iconContainer}>
            <Grid item md={1}>
            <HealingTwoTone></HealingTwoTone>
            </Grid>
            <Grid item md={1}>
            <AccessibleTwoTone></AccessibleTwoTone>
            </Grid>
            <Grid item md={1}>
            <AirplanemodeActiveTwoTone></AirplanemodeActiveTwoTone>
            </Grid>
           
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <Grid container spacing={3} sx={{ ml: 0, mr: 8, mb: 3 }}>
            <Grid item md={12}>
              <Card
                elevation={6}
                sx={{ mr: 4, p: 4 }}
                className={classes.cardEmp}
              >
                <Grid container>
                  <Grid item md={2}>
                    <Avatar
                      src={employee.profilePic}
                      className={classes.large}
                    ></Avatar>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>
                      {employee.employeeFirstName +
                        " " +
                        employee.employeeLastName}
                    </Typography>
                    <Typography>{employee.employeeID}</Typography>
                  </Grid>

                  <Grid item md={6}>
                    <Typography>{employee.jobRole}</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <Grid container className={classes.step}>
            <Typography variant="h5"> Select Leave Type</Typography>
          </Grid>

          <Grid container spacing={3} sx={{ ml: 0, mr: 8, mb: 3 }}>
            <Grid item md={3.9}>
              <Card elevation={6} onClick={() => handleClickOpen("Annual")}>
                <CardActionArea className={classes.card1}>
                  <Grid container>
                    <Grid item md={4} className={classes.cardIcon}>
                      <LuggageIcon />
                    </Grid>
                    <Grid item md={8} className={classes.title}>
                      <Typography variant="h5">Annual</Typography>
                    </Grid>
                    <Grid item md={12} sx={{ mt: 2, mb: 2 }}>
                      <Divider />
                      <Divider />
                      <Divider />
                    </Grid>
                    <Grid item md={12} className={classes.cardText}>
                      <Grid container>
                        <Grid item md={12}>
                          <Typography>
                            Remaining Leaves:{" "}
                            {leaveBalance.remainingAnnual &&
                            leaveBalance.remainingAnnual < 10
                              ? "0" + leaveBalance.remainingAnnual
                              : leaveBalance.remainingAnnual}
                          </Typography>
                        </Grid>
                        <Grid item md={12}>
                          <Typography>
                            Entitled Leaves: {leaveBalance.entitledAnnualLeave}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item md={3.9}>
              <Card elevation={6} onClick={() => handleClickOpen("Casual")}>
                <CardActionArea className={classes.card2}>
                  <Grid container>
                    <Grid item md={4} className={classes.cardIcon}>
                      <TimeToLeaveIcon />
                    </Grid>
                    <Grid item md={8} className={classes.title}>
                      <Typography variant="h5">Casual</Typography>
                    </Grid>
                    <Grid item md={12} sx={{ mt: 2, mb: 2 }}>
                      <Divider />
                      <Divider />
                      <Divider />
                    </Grid>
                    <Grid item md={12} className={classes.cardText}>
                      <Grid container>
                        <Grid item md={12}>
                          <Typography>
                            Remaining Leaves:{" "}
                            {leaveBalance.remainingCasual &&
                            leaveBalance.remainingCasual < 10
                              ? "0" + leaveBalance.remainingCasual
                              : leaveBalance.remainingCasual}
                          </Typography>
                        </Grid>
                        <Grid item md={12}>
                          <Typography>
                            Entitled Leaves: {leaveBalance.entitledCasualLeave}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item md={3.9}>
              <Card elevation={6} onClick={() => handleClickOpen("Medical")}>
                <CardActionArea className={classes.card3}>
                  <Grid container>
                    <Grid item md={4} className={classes.cardIcon}>
                      <MedicalServicesIcon />
                    </Grid>
                    <Grid item md={8} className={classes.title}>
                      <Typography variant="h5">Medical</Typography>
                    </Grid>
                    <Grid item md={12} sx={{ mt: 2, mb: 2 }}>
                      <Divider />
                      <Divider />
                      <Divider />
                    </Grid>
                    <Grid item md={12} className={classes.cardText}>
                      <Grid container>
                        <Grid item md={12}>
                          <Typography>
                            Remaining Leaves:{" "}
                            {leaveBalance.remainingMedical &&
                            leaveBalance.remainingMedical < 10
                              ? "0" + leaveBalance.remainingMedical
                              : leaveBalance.remainingMedical}
                          </Typography>
                        </Grid>
                        <Grid item md={12}>
                          <Typography>
                            Entitled Leaves: {leaveBalance.entitledMedicalLeave}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
      {popUp && (
        <IncreaseDialogBox
          open={open}
          setOpen={setOpen}
          leaveType={leaveType}
          employee={employee}
          setLeaveBalance={setLeaveBalance}
          render={render}
          setRender={setRender}
        />
      )}
    </Box>
  );
};

export default IncreaseEntitledLeaves;
