import React from "react";
import DisplayTeams from "../../../Components/ReportersManagementModule/TeamDisplay/DisplayTeams";
import { Grid, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function TeamPage({ teamcreate }) {
  const jobRole = JSON.parse(sessionStorage.getItem("user")).jobRole;
  return (
    <div>
      <Box padding={4} bgcolor="#d7dde0">
        <Grid container>
          <Grid item sm={12} md={3.5}>
            {/* <Link to="/teams/create"> */}
            {jobRole === "HR Manager" && (
              <Button
                LinkComponent={Link}
                to={`/teams/create`}
                type="button"
                variant="contained"
                sx={{
                  backgroundColor: "#183d78",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#4d5575",
                    color: "#fff",
                  },
                }}
              >
                Create Team
              </Button>
            )}
            {/* </Link> */}
          </Grid>
          <Grid item md={7.5} sx={{mt:2}}>
            <Typography
              variant="h4"
              textAlign="left"
              fontWeight="bold"
              color="#183d78"
            >
              Teams of DirectFN PVT (LTD)
            </Typography>
          </Grid>
        </Grid>

        <Grid item sm={12} md={12} sx={{}}>
          <DisplayTeams />
        </Grid>
      </Box>
    </div>
  );
}

export default TeamPage;
