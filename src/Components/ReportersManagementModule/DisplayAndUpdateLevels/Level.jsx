import { Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from "./LevelsStyles";
import LevelUpdateDialog from "./LevelUpdateDialog";

const Level = ({ level, setRender, render }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item md={12}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {level.level}
          </Typography>
          <br />
          {/* {console.log(level.jobRole)} */}
          {level && level.jobRole.map((job) => {
            // console.log(job,{message:"jjjjj"})
            return (
              <Typography
                variant="h6"
                sx={{
                  color: "#c1dce8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                key={job}
              >
                {job}
              </Typography>
            );
          })}
          <br />
        </Grid>
        <Grid item md={12} sx={{ textAlign: "center" }}>
          <LevelUpdateDialog
           setRender={setRender}
            level={level}
            render={render}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Level;
