import { BorderColorTwoTone, Send } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { render } from "react-dom";
import { getLeaveBalanceOfEmployee, increaseLeaves } from "../../../../Api/LeaveManagementModule/LeaveApi";
import useStyles from "./IncreaseDialogBoxStyles";


const IncreaseDialogBox = ({
  open,
  leaveType,
  employee,
  setOpen,
  setRender,
  render,
  setLeaveBalance
}) => {
  const classes = useStyles();
  const [data, setData] = useState({
    increasedDates: "",
    reason: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleSubmit = async (event) => {
    await increaseLeaves(employee.employeeID, leaveType, data);
    setOpen(false);
    setRender(false);
    setLeaveBalance(await getLeaveBalanceOfEmployee(employee.employeeID))
    setData({ increasedDates: "", reason: "" });
    setRender(!render)
  };
  const handleOnChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <Paper sx={{ width: 900 }}>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setData({ increasedDates: "", reason: "" });
        }}
      >
        <DialogTitle>
          <Grid container sx={{mt:3}}>
          <BorderColorTwoTone/>
          <Typography className={classes.title} variant="h5">
            Increase Entitled Leaves
          </Typography>
          </Grid>
          <Divider/>
          <Divider/>
        </DialogTitle>
        <DialogContent>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <Grid container className={classes.formLabel}>
                  <Grid item sm={4} md={12}>
                    <InputLabel>Employee Id</InputLabel>
                  </Grid>
                  <Grid item sm={8} md={12} sx={{ mr: 2 }}>
                    <TextField
                      variant="filled"
                      value={employee.employeeID}
                      disabled
                      fullWidth
                      name="employeeId"
                      onChange={(event) => {
                        handleOnChange(event);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={12} md={6}>
                <Grid container>
                  <Grid
                    item
                    sm={4}
                    md={12}
                    className={classes.formLabel}
                    sx={{ ml: 2 }}
                  >
                    <InputLabel>Leave Type</InputLabel>
                  </Grid>
                  <Grid item sm={8} md={12} sx={{ ml: 2 }}>
                    <TextField
                      variant="filled"
                      value={leaveType}
                      disabled
                      fullWidth
                      name="Leave Type"
                      onChange={(event) => {
                        handleOnChange(event);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={12} md={12}>
                <Grid container>
                  <Grid item sm={4} md={12} className={classes.formLabel}>
                    <InputLabel>
                      Number of dates do you want to Increase
                    </InputLabel>
                  </Grid>
                  <Grid item sm={8} md={12}>
                    <TextField
                      select
                      variant="filled"
                      fullWidth
                      name="increasedDates"
                      onChange={(event) => {
                        handleOnChange(event);
                      }}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                      <MenuItem value="7">7</MenuItem>
                      <MenuItem value="8">8</MenuItem>
                      <MenuItem value="9">9</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={12} md={12}>
                <Grid container>
                  <Grid item sm={4} md={12} className={classes.formLabel}>
                    <InputLabel>Reason</InputLabel>
                  </Grid>
                  <Grid item sm={8} md={812}>
                    <TextField
                      variant="filled"
                      fullWidth
                      name="reason"
                      onChange={(event) => {
                        handleOnChange(event);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button className={classes.button}
            
            disabled={data.increasedDates ? false : true}
            variant="contained"
            endIcon={<Send />}
            sx={{ mt: 2, mr: 6, mb: 2, ml: 6 }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Increase
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default IncreaseDialogBox;
