import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getTeamLead } from "../../../Api/LeaveManagementModule/LeaveApi";
import useStyles from "./TeamLeadStyles";
import PhoneIcon from "@mui/icons-material/Phone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const TeamLead = () => {
  const [teamLead, setTeamLead] = useState({});

  const fetchData = async () => {
    setTeamLead(
      await getTeamLead(JSON.parse(sessionStorage.getItem("user")).employeeID)
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.title} variant="h5">
        Team Leader
      </Typography>
      <Paper elevation={5} className={classes.paper}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar src={teamLead.profilePic} className={classes.image}></Avatar>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid sx={{ mb: 2 }}>
            <Typography fontFamily="Rubik" sx={{ fontSize: 20 }}>
              {teamLead.employeeID +
                " | " +
                teamLead.employeeFirstName +
                " " +
                teamLead.employeeLastName}
            </Typography>
          </Grid>
          <Grid container md={12} sx={{ justifyContent: "center" }}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ color: "#4a148c", fontWeight: "bold" }}
            >
              Last Active Time{" "}
              {": " +
                moment(teamLead.lastSeen).format("ddd MMM DD YYYY hh:mm:ss")}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2,ml: 2, mr: 2 }}></Divider>
        <Divider sx={{ ml: 2, mr: 2 ,mb:2}}></Divider>
        <Grid container className={classes.detail}>
          <Grid>
            <Typography fontFamily="Rubik" sx={{ mb: 2, fontSize: 20 }}>
              Contact Detail
            </Typography>
          </Grid>
        </Grid>

        {teamLead.phoneNumber && (
          <Grid container>
            <Grid>
              <PhoneIcon />
            </Grid>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{
                color: "#4a148c",
                mt: 1,
                ml: 2,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {teamLead.phoneNumber}
            </Typography>
          </Grid>
        )}
        {teamLead.companyEmail && (
          <Grid container>
            <AttachEmailIcon  color="white"/>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{
                color: "#4a148c",
                mt: 1,
                ml: 2,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {teamLead.companyEmail}
            </Typography>
          </Grid>
        )}

        {teamLead.streetNo && teamLead.city && (
          <Grid container>
            <LocationOnIcon />
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{
                color: "#4a148c",
                mt: 1,
                ml: 2,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {teamLead.streetNo + ", " + teamLead.city}
            </Typography>
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default TeamLead;
