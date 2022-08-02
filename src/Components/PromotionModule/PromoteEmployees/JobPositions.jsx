import { FilterList } from "@mui/icons-material";
import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./PromoteEmployeeStyles";

const jobPositions = [
  "Software Engineer",
  "Senior Software Engineer",
  "HR Manager",
  "IT Employee",
  "CTO",
  "Associate Software Engineer",
  "Software Architect",
  "Tech Lead",
  "UI/UX Designer",
  "Business Analyst",
  "Product Manager",
  "Quality Assurance Engineer",
  "Intern",
];

const JobPositions = () => {
  const classes = useStyles();
  return (
    <Box>
      <Grid container className={classes.header}>
        <Typography variant="h5">Company Job Positions</Typography>
      </Grid>

      <Grid container className={classes.jobContainer}>
        <Grid item md={11}>
          <Grid container spacing={2}>
            {jobPositions.map((position) => (
              <Grid key={position} item md={3}>
                <Card className={classes.jobCard}>
                  <Typography variant="h6"><FilterList sx={{mr : 1}} />{position}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobPositions;
