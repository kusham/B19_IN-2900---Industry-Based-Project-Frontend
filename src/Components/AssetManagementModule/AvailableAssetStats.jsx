import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "./AvailableAssetStatsStyle";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

const AvailableAssetStats = ({countAvailable}) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item md={4}>
          <Card elevation={6} className={classes.card1}>
            <Grid container>
              <Grid item md={8} className={classes.cardText}>
                <Typography variant="h2">{countAvailable}</Typography>
                <Typography>Total Available Assets</Typography>
              </Grid>
              <Grid item md={4} className={classes.cardIcon}>
                <DoneOutlinedIcon />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AvailableAssetStats;