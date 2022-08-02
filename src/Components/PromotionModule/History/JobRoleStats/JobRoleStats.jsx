import { People, PersonPin } from "@mui/icons-material";
import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { getJobRoleStats } from "../../../../Api/PromotionModule/PromotionApi/PromotionApi";
import { useStyles } from "./JobRoleStatsStyles";

const JobRoleStats = () => {
  const [jobRoleStats, setJobRoleStats] = useState({
    totalEmployees: 0,
    HRManager: 0,
    SoftwareEngineer: 0,
    SeniorSoftwareEngineer: 0,
    SoftwareArchitect: 0,
    AssociateSoftwareEngineer: 0,
    UIUXDesigner: 0,
  });

  const fetchData = async () => {
    setJobRoleStats(await getJobRoleStats());
  };
  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Box>
      <Grid container className={classes.header}>
        <Typography variant="h5">Job Role Stats</Typography>
      </Grid>

      <Grid container>
        <Grid item md={12}>
          <Card
            square
            className={classes.card1}
            sx={{ "&:hover": { transform: "scale3d(1.05, 1.05, 3)" } }}
          >
            <Grid container>
              <Grid item md={6} className={classes.icon1}>
                <People />
              </Grid>
              <Grid item md={5} className={classes.content}>
                <Typography variant="h2">
                  {jobRoleStats < 10
                    ? "0" + jobRoleStats.totalEmployees
                    : jobRoleStats.totalEmployees}
                </Typography>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5">Employees</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Card
                square
                className={classes.card2}
                sx={{ "&:hover": { transform: "scale3d(1.05, 1.05, 3)" } }}
              >
                <Grid container>
                  <Grid item md={6} className={classes.icon2}>
                    <PersonPin />
                  </Grid>
                  <Grid item md={5} className={classes.content}>
                    <Typography variant="h2">
                      {jobRoleStats.HRManager < 10
                        ? "0" + jobRoleStats.HRManager
                        : jobRoleStats.HRManager}
                    </Typography>
                    <Typography variant="h6">HR</Typography>
                    <Typography variant="h5">Manager</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card
                square
                className={classes.card2}
                sx={{ "&:hover": { transform: "scale3d(1.05, 1.05, 3)" } }}
              >
                <Grid container>
                  <Grid item md={6} className={classes.icon2}>
                    <PersonPin />
                  </Grid>
                  <Grid item md={5} className={classes.content}>
                    <Typography variant="h2">
                      {jobRoleStats.SoftwareEngineer < 10
                        ? "0" + jobRoleStats.SoftwareEngineer
                        : jobRoleStats.SoftwareEngineer}
                    </Typography>
                    <Typography variant="h6">Software</Typography>
                    <Typography variant="h5">Engineer</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item md={6}>
              <Card
                square
                className={classes.card2}
                sx={{ "&:hover": { transform: "scale3d(1.05, 1.05, 3)" } }}
              >
                <Grid container>
                  <Grid item md={6} className={classes.icon2}>
                    <PersonPin />
                  </Grid>
                  <Grid item md={5} className={classes.content}>
                    <Typography variant="h2">
                      {jobRoleStats.SoftwareArchitect < 10
                        ? "0" + jobRoleStats.SoftwareArchitect
                        : jobRoleStats.SoftwareArchitect}
                    </Typography>
                    <Typography variant="h6">Software</Typography>
                    <Typography variant="h5">Architect</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item md={6}>
              <Card
                square
                className={classes.card2}
                sx={{ "&:hover": { transform: "scale3d(1.05, 1.05, 3)" } }}
              >
                <Grid container>
                  <Grid item md={6} className={classes.icon2}>
                    <PersonPin />
                  </Grid>
                  <Grid item md={5} className={classes.content}>
                    <Typography variant="h2">
                      {jobRoleStats.UIUXDesigner < 10
                        ? "0" + jobRoleStats.UIUXDesigner
                        : jobRoleStats.UIUXDesigner}
                    </Typography>
                    <Typography variant="h6">UI/UX</Typography>
                    <Typography variant="h5">Designer</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobRoleStats;
