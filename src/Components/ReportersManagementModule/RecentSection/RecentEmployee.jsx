import useStyles from "./RecentEmployeeSectionStyles";
import { Typography, Avatar, Card, Grid, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllTeams } from "../../../Api/ReportersManagementModule/TeamsApi";
function RecentEmployee({ profile }) {
  const [teams, setTeams] = useState();

  const {
    employeeFirstName,
    employeeLastName,
    phoneNumber,
    companyEmail,
    jobRole,
    profilePic,
    teamID,
  } = profile;
  useEffect(() => {
    async function fetchData() {
      setTeams(await getAllTeams());
    }
    fetchData();
  }, []);
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <Typography sx={{ mb: 1, fontWeight: "bold", color: "#290f91" }}>
          {employeeFirstName + " " + employeeLastName + " | " + jobRole}
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={4} sx={{ justifyContent: "center", display: "flex" }}>
            <Avatar
              sx={{ width: 80, height: 80, border: "2px solid #290f91" }}
              src={profilePic}
              alt={employeeFirstName + " " + employeeLastName}
            ></Avatar>
          </Grid>
          <Grid item md={8} sx={{ mt: 1 }}>
            <Typography textAlign="center"> {companyEmail}</Typography>
            <Typography textAlign="center"> {phoneNumber}</Typography>
            <Divider sx={{ mt: 1, mb: 1 }}></Divider>
            {teams &&
              teams.map((team) => {
                if (team._id === teamID) {
                  return (
                    <Typography
                      textAlign="center"
                      sx={{ fontWeight: "bold", color: "#0257bf" }}
                      key={team._id}
                    >
                      {team.teamName}
                    </Typography>
                  );
                }
              })}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default RecentEmployee;
