import { Paper, Typography } from "@mui/material";
import Calendar from 'react-calendar';
import React, { useState } from "react";

import 'react-calendar/dist/Calendar.css';
import { Box } from "@mui/system";
import useStyles from "./InterviewerCalenderStyles";

const InterviewerCalender = () => {
    const [value, onChange] = useState(new Date());
    const classes = useStyles();
    return (
      <Box>
      <Typography className={classes.title} variant="h5">
      Recent Candidates
    </Typography>
      <Paper>
        <Calendar onChange={onChange} value={value} />
      </Paper>

      </Box>
    );
};

export default InterviewerCalender;
