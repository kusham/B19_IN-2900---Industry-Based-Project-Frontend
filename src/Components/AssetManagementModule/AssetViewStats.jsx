import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "./AssetViewStatsStyles";
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

const AssetViewStats = ({countAvailable,countNonAvailable,countFault}) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container spacing={3}>
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
        <Grid item md={4}>
          <Card elevation={6} className={classes.card2}>
          <Grid container>
              <Grid item md={8} className={classes.cardText}>
                <Typography variant="h2">{countFault}</Typography>
                <Typography>Total Fault Assets</Typography>
              </Grid>
              <Grid item md={4} className={classes.cardIcon}>
                <SentimentDissatisfiedOutlinedIcon />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card elevation={6} className={classes.card3}>
          <Grid container>
              <Grid item md={9} className={classes.cardText}>
                <Typography variant="h2">{countNonAvailable}</Typography>
                <Typography>Total Non-Available Assets</Typography>
              </Grid>
              <Grid item md={3} className={classes.cardIcon}>
                <CloseOutlinedIcon />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssetViewStats;