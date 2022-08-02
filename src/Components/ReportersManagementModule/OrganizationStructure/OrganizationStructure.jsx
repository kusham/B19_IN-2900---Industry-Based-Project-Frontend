import { Avatar, Card, Divider, Grid, Typography } from "@mui/material";
import useStyles from "../OrganizationStructure/OrganizationStructureStyles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getJobRoles } from "../../../Api/ReportersManagementModule/EmployeeApi";
import { getOrganizationStructure } from "../../../Api/ReportersManagementModule/OrganizationApi";

function OrganizationStructure() {
  const [organization, setOrganization] = useState();

  useEffect(() => {
    async function fetchData() {
      setOrganization(await getJobRoles());
    }
    fetchData();
    getOrganizationStructure()
  }, []);

  const classes = useStyles();
  return (
    <div>
      <Box bgcolor="#d7dde0" padding={4}>
        <Divider sx={{ mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ color: "#183d78", fontWeight: "bold" }}
          >
            Level One
          </Typography>
        </Divider>
        <Grid container className={classes.gridContainer}>
          {organization &&
            organization.levelOne.map((employee) => (
              <Grid key={employee.employeeID} item md={3}>
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item md={3.5}>
                      <Avatar
                        className={classes.avatar}
                        src={employee.profilePic}
                        alt={employee.Name}
                      />
                    </Grid>
                    <Grid item md={8.5}>
                      <Typography className={classes.typography}>
                        {employee.Name}
                      </Typography>
                      <Typography className={classes.typography}>
                        {employee.jobRole}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>

        <Divider sx={{ mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ color: "#183d78", fontWeight: "bold" }}
          >
            Level Two
          </Typography>
        </Divider>
        <Grid container className={classes.gridContainer}>
          {organization &&
            organization.levelTwo.map((employee) => (
              <Grid key={employee.employeeID} item md={3}>
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item md={3.5}>
                      <Avatar
                        className={classes.avatar}
                        src={employee.profilePic}
                        alt={employee.Name}
                      />
                    </Grid>
                    <Grid item md={8.5}>
                      <Typography className={classes.typography}>
                        {employee.Name}
                      </Typography>
                      <Typography className={classes.typographyJob}>
                        {employee.jobRole}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>

        <Divider sx={{ mt: 2, mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ color: "#183d78", fontWeight: "bold" }}
          >
            Level Three
          </Typography>
        </Divider>

        <Grid container className={classes.gridContainer}>
          {organization &&
            organization.levelThree.map((employee) => (
              <Grid key={employee.employeeID} item md={3}>
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item md={3.5}>
                      <Avatar
                        className={classes.avatar}
                        src={employee.profilePic}
                        alt={employee.Name}
                      />
                    </Grid>
                    <Grid item md={8.5}>
                      <Typography className={classes.typography}>
                        {employee.Name}
                      </Typography>
                      <Typography className={classes.typographyJob}>
                        {employee.jobRole}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ color: "#183d78", fontWeight: "bold" }}
          >
            Level Four
          </Typography>
        </Divider>

        <Grid container className={classes.gridContainer}>
          {organization &&
            organization.levelFour.map((employee) => (
              <Grid key={employee.employeeID} item md={3}>
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item md={3.5}>
                      <Avatar
                        className={classes.avatar}
                        src={employee.profilePic}
                        alt={employee.Name}
                      />
                    </Grid>
                    <Grid item md={8.5}>
                      <Typography className={classes.typography}>
                        {employee.Name}
                      </Typography>
                      <Typography className={classes.typographyJob}>
                        {employee.jobRole}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
}

export default OrganizationStructure;
