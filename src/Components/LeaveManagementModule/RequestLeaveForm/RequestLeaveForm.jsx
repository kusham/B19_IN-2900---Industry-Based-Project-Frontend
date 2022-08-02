import { Close } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useStyles from "./RequestFormStyles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { requestLeave } from "../../../Api/LeaveManagementModule/LeaveApi";
import moment from "moment";
import { isMoment } from "moment";

const RequestLeaveForm = ({ leaveBalance }) => {
  const classes = useStyles();
  const [leave, setLeave] = useState({
    leaveType: "",
    reason: "",
    startDate: "",
    endDate: "",
    leaveMethod: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [notEnough, setNotEnough] = useState(false);
  const [leaveOverMessage, setLeaveOverMessage] = useState(null);
  const [leaveErrors, setLeaveErrors] = useState({
    leaveType: "",
    reason: "",
    startDate: "",
    endDate: "",
    leaveMethod: "",
  });
  const errorHandle = () => {
    var error = false;
    Object.keys(leave).forEach((property) => {
      if (!leave[property] ) {
        setLeaveErrors((prevState) => ({
          ...prevState,
          [property]: property + " is required",
        }));
        error = true;
      }

      if(leave.leaveMethod !== "multiple Day") {
        setLeaveErrors((prevState) => ({
          ...prevState,
         endDate: "",
        }));
        error = false;
      }
      // if (leave.startDate < new Date()) {
      //   setLeaveErrors((prevState) => ({
      //     ...prevState,
      //     startDate: "can not select previous dates.",
      //   }));
      //   error = true;
      // }
    });

    return error;
  };

  const handleOnChange = (event) => {
    setLeave({ ...leave, [event.target.name]: event.target.value });
    setLeaveErrors((prevState) => ({
      ...prevState,
      [event.target.name]: "",
    }));
  };

  const handleRemaining = () => {
    let isEnough = true;

    let numberOfLeaveDates = 0;
    let holidays = 0;

    if (leave.leaveMethod === "multiple Day") {
      for (
        let index = new Date(leave.startDate);
        index <= new Date(leave.endDate);
        index.setDate(index.getDate() + 1)
      ) {
        if (index.getDay() == 0 || index.getDay() == 6) {
          holidays++;
        }

        numberOfLeaveDates++;
      }

      numberOfLeaveDates -= holidays;
    } else if (leave.leaveMethod === "full Day") {
      numberOfLeaveDates = 1;
    } else if (leave.leaveMethod === "half Day") {
      numberOfLeaveDates = 0.5;
    }
    switch (leave.leaveType) {
      case "Annual":
        if (leaveBalance.remainingAnnual - numberOfLeaveDates < 0) {
          isEnough = false;
          setLeaveOverMessage("Remaining Annual leaves are not enough");
        }
        break;
      case "Casual":
        if (leaveBalance.remainingCasual - numberOfLeaveDates < 0) {
          isEnough = false;
          setLeaveOverMessage("Remaining Casual leaves are not enough");
        }
        break;
      case "Medical":
        if (leaveBalance.remainingMedical - numberOfLeaveDates < 0) {
          isEnough = false;
          setLeaveOverMessage("Remaining Medical leaves are not enough");
        }
        break;

      default:
        break;
    }

    return isEnough;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!errorHandle()) {
      if (handleRemaining()) {
        const response = await requestLeave(leave);
        console.log(response);
        clearForm();

        if (response.success === true) {
          setOpenSnackBar(true);
        }
      } else {
        setNotEnough(true);
        setTimeout(() => {
          setNotEnough(false);
        }, 5000);
      }
    }
    console.log(leaveErrors);
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const clearForm = () => {
    setLeave({
      leaveType: "",
      reason: "",
      startDate: "",
      endDate: "",
      leaveMethod: "",
    });
  };

  return (
    <Box>
      <Typography className={classes.title} variant="h5">
        Request Leave
      </Typography>

      <Paper elevation={6} className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Grid container className={classes.input}>
                <Grid item sm={4} md={4} className={classes.formLabel}>
                  <InputLabel>Leave Type</InputLabel>
                </Grid>
                <Grid item sm={8} md={8}>
                  <TextField
                    label="Select Leave Type"
                    select
                    name="leaveType"
                    fullWidth
                    value={leave.leaveType}
                    variant="filled"
                    onChange={handleOnChange}
                    error={leaveErrors.leaveType ? true : false}
                    helperText={leaveErrors.leaveType}
                  >
                    <MenuItem value="Annual">Annual Leave</MenuItem>
                    <MenuItem value="Casual">Casual Leave</MenuItem>
                    <MenuItem value="Medical">Medical Leave</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Grid container className={classes.input}>
                <Grid item sm={4} md={4} className={classes.formLabel}>
                  <InputLabel>Start date</InputLabel>
                </Grid>
                <Grid item sm={8} md={8}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DatePicker
                        label="Select Start Date"
                        inputFormat="MM/dd/yyyy"
                        name="startDate"
                        value={leave.startDate}
                        disablePast
                        
                        onChange={(newValue) => {
                          setLeave({ ...leave, startDate: newValue });
                          setLeaveErrors((prevState) => ({
                            ...prevState,
                            startDate: "",
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField variant="filled" {...params} error={leaveErrors.startDate ? true : false}
                          helperText={leaveErrors.startDate}/>
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid container className={classes.input}>
                <Grid item sm={4} md={4} className={classes.formLabel}>
                  <InputLabel>Reason</InputLabel>
                </Grid>
                <Grid item sm={8} md={8}>
                  <TextField
                    label="Type Your reason for leave"
                    multiline
                    name="reason"
                    fullWidth
                    value={leave.reason}
                    variant="filled"
                    onChange={handleOnChange}
                    error={leaveErrors.reason ? true : false}
                    helperText={leaveErrors.reason}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} md={6}>
              <Grid container className={classes.input}>
                <Grid item sm={4} md={4} className={classes.formLabel}>
                  <InputLabel>Leave Method</InputLabel>
                </Grid>
                <Grid item sm={8} md={8}>
                  <TextField
                    label="Select Leave Type"
                    select
                    name="leaveMethod"
                    fullWidth
                    value={leave.leaveMethod}
                    variant="filled"
                    onChange={handleOnChange}
                    error={leaveErrors.leaveMethod ? true : false}
                    helperText={leaveErrors.leaveMethod}
                  >
                    <MenuItem value="half Day">half Day</MenuItem>
                    <MenuItem value="full Day">full Day</MenuItem>
                    <MenuItem value="multiple Day">multiple Day</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              {leave.leaveMethod === "multiple Day" && (
                <Grid container className={classes.input}>
                  <Grid item sm={4} md={4} className={classes.formLabel}>
                    <InputLabel>End date</InputLabel>
                  </Grid>
                  <Grid item sm={8} md={8}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DatePicker
                          label="Select End Date"
                          inputFormat="MM/dd/yyyy"
                          name="endDate"
                          minDate={leave.startDate}
                          value={leave.endDate}
                          onChange={(newValue) => {
                            setLeave({ ...leave, endDate: newValue });
                            setLeaveErrors((prevState) => ({
                              ...prevState,
                              endDate: "",
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField variant="filled" {...params} error={leaveErrors.endDate ? true : false}
                            helperText={leaveErrors.endDate} />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid container className={classes.button}>
            <Button
              onClick={clearForm}
              sx={{ backgroundColor: "#b71c1c", mr: 2 }}
              variant="contained"
              size="large"
              color="error"
              // sx={{ mr: 2 }}
            >
              Clear
            </Button>
            <Button
              onClick={handleSubmit}
              color="secondary"
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#4a148c" }}
            >
              Apply
            </Button>
          </Grid>
        </form>

        {notEnough && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
          {leaveOverMessage}
          </Alert>
        </Stack>
        )}

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={openSnackBar}
          onClose={handleCloseSnackBar}
          autoHideDuration={5000}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackBar}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Leave successfully sent
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default RequestLeaveForm;
