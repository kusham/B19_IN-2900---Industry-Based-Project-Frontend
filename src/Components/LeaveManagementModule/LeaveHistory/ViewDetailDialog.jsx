import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import useStyles from "./ViewDetailDialogStyles";
import { cancelLeave } from "../../../Api/LeaveManagementModule/LeaveApi";

const ViewMoreDialog = ({
  open,
  handleClose,
  leave,
  leaveHistory,
  setLeaveHistory,
  setCancel,
  cancel,
}) => {
  const classes = useStyles();
  const [reason, setReason] = useState();
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const handleSubmit = async () => {
    // const response =
    await cancelLeave(reason, leave.leaveHistory._id);
    setReason("");
    setLeaveHistory(leaveHistory.filter((lev) => lev !== leave));
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      ia-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        className={classes.title}
        sx={{ backgroundColor: "#fff8e1" }}
      >
        <Grid container>
          <Grid item md={12} className={classes.closeButton}>
            <IconButton onClick={handleClose}>
              <Close fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item md={12} sx={{ mt: 1 }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="h5"
                fontFamily="Rubik"
                sx={{ fontSize: 25, color: "#4a148c" }}
              >
                Leave Details
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2 }}></Divider>
        <Divider></Divider>
        <Divider></Divider>
      </DialogTitle>
      <DialogContent
        className={classes.root}
        sx={{ backgroundColor: "#fff8e1" }}
      >
        <Grid container>
          <Grid item md={12} className={classes.content}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ mr: 2, fontSize: 20, color: "#4a148c" }}
            >
              Leave type{" "}
            </Typography>
            <Grid item md={12}>
              <Card className={classes.card}>
                <Typography fontFamily="Rubik">
                  {leave.leaveHistory.leaveType}
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Grid item md={12} className={classes.content}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ mr: 2, fontSize: 20, color: "#4a148c" }}
            >
              Start date{" "}
            </Typography>
            <Card className={classes.card}>
              <Typography fontFamily="Rubik">
                {new Date(leave.leaveHistory.startDate).toDateString()}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={12} className={classes.content}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ mr: 2, fontSize: 20, color: "#4a148c" }}
            >
              End Date{" "}
            </Typography>
            <Card className={classes.card}>
              <Typography fontFamily="Rubik">
                {new Date(leave.leaveHistory.endDate).toDateString()}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={12} className={classes.content}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ mr: 2, fontSize: 20, color: "#4a148c" }}
            >
              Reason{" "}
            </Typography>
            <Card className={classes.card}>
              <Typography fontFamily="Rubik">
                {leave.leaveHistory.reason}
              </Typography>
            </Card>
          </Grid>
        </Grid>
        {cancel && (
          <TextField
            label="Type a reason for cancellation"
            name="reason"
            variant="filled"
            value={reason}
            fullWidth
            multiline
            rows={3}
            onChange={(event) => setReason(event.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#fff8e1" }}>
        {leave.leaveHistory.status === "Pending" && !cancel && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              fullWidth
              sx={{mt:2,mb:2,mr:10,ml:10 }}
              variant="contained"
              minWidth="60px"
              color="error"
              onClick={() => setCancel(true)}
            >
              Cancel Leave
            </Button>
          </Grid>
        )}
        {cancel && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              fullWidth
              name="reason"
              sx={{ mt: 2, mr: 10, mb: 2,ml:10  }}
              disabled={reason ? false : true}
              variant="contained"
              
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ViewMoreDialog;
