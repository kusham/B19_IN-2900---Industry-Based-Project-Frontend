import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, Close, Send } from "@mui/icons-material";
import useStyles from "../ViewDetailDialogStyles";
import ConfirmApproval from "./ConfirmApproval";
import { responseRequestedLeave } from "../../../../Api/LeaveManagementModule/LeaveApi";



const ViewDetailTeamLead = ({
  open,
  onClose,
  leaveDetail,
  approve,
  setReject,
  reject,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reason, setReason] = useState(null);
  const classes = useStyles();
  const handleOnChange = (event) => {
    setReason(event.target.value);
  };
  const handleResponse = async () => {
    await responseRequestedLeave(leaveDetail.leave._id, reason);
    setConfirmOpen(false);
    setReason(null);
    onClose();
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };
  const back = () => {
    setReject(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{backgroundColor:"#fff8e1"}}>
        <Grid container>
          {reject && (
            <Grid item md={6}>
              <IconButton onClick={back}>
                <ArrowBack />
              </IconButton>
            </Grid>
          )}

          <Grid item md={reject ? 6 : 12} className={classes.closeButton}>
            <IconButton onClick={onClose}>
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
      </DialogTitle>
      <DialogContent sx={{backgroundColor:"#fff8e1"}}>
        <Grid container>
          <Card  sx={{ m: "auto", padding:2 }}>
          <Grid item md={12} className={classes.content}>
            <Avatar
              sx={{ m: "auto" }}
              className={classes.large}
              src={leaveDetail.employee.profilePic}
            />
          </Grid>
          </Card>
          <Grid item md={12} className={classes.content}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography sx={{ m: "auto", fontSize: 20, fontWeight: 600 }}>
                {leaveDetail.employee.employeeID +
                  " | " +
                  leaveDetail.employee.employeeFirstName +
                  " " +
                  leaveDetail.employee.employeeLastName}
              </Typography>
            </Grid>
            <Divider sx={{ mt: 2 , fontWeight:"bold"}}></Divider>
            <Divider></Divider>
            <Divider></Divider>

          </Grid>

          <Grid item md={12} className={classes.content}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ mr: 2, fontSize: 20, color: "#4a148c" }}
            >
              Leave Type:
            </Typography>
            <Card className={classes.card} >
              <Typography fontFamily="Rubik">
                {leaveDetail.leave.leaveType}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={12} className={classes.content}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ mr: 2, fontSize: 20, color: "#4a148c" }}
            >
              Leave Method:
            </Typography>
            <Card className={classes.card} >
              <Typography fontFamily="Rubik">
                {leaveDetail.leave.leaveMethod}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={12} className={classes.content}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ mr: 2, fontSize: 20, color: "#4a148c" }}
            >
              Start Date:
            </Typography>
            <Card className={classes.card}>
              <Typography fontFamily="Rubik">
                {new Date(leaveDetail.leave.startDate).toDateString()}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={12} className={classes.content}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ mr: 2, fontSize: 20, color: "#4a148c" }}
            >
              {" "}
              End Date:
            </Typography>
            <Card className={classes.card}>
              <Typography fontFamily="Rubik">
                {new Date(leaveDetail.leave.endDate).toDateString()}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={12} className={classes.content}>
            <Typography
              fontFamily="Segoe UI Emoji"
              sx={{ mr: 2, fontSize: 20, color: "#4a148c" }}
            >
              Reason:
            </Typography>
            <Card className={classes.card}>
              <Typography fontFamily="Rubik">
                {leaveDetail.leave.reason}
              </Typography>
            </Card>
          </Grid>
        </Grid>
        {reject && (
          <TextField
            label="Type reasons for rejecting"
            sx={{ backgroundColor: "white" }}
            onChange={handleOnChange}
            name="reason"
            variant="filled"
            fullWidth
            multiline
            rows={3}
          />
        )}
      </DialogContent>
      <DialogActions sx={{backgroundColor:"#fff8e1"}}>
        {leaveDetail.leave.status === "Pending" && !(approve || reject) && (
          <Grid container>
            <Grid
              item
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
              fullWidth
                onClick={handleConfirmOpen}
                variant="contained"
                color="secondary"
                sx={{ mt: 2, mr: 1, mb: 2,ml:2}}
              >
                Approve
              </Button>
            </Grid>
            <ConfirmApproval
              confirmOpen={confirmOpen}
              setConfirmOpen={setConfirmOpen}
              handleApprove={handleResponse}
            />
            <Grid item md={6}  sx={{display: "flex", justifyContent: "center"}}>
              <Button
              fullWidth
                onClick={() => setReject(true)}
                variant="contained"
                color="error"
                sx={{ mt: 2, mr: 3, mb: 2 }}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        )}

        {reject && (
          <Button
          fullWidth
            disabled={reason ? false : true}
            variant="contained"
            onClick={handleResponse}
            endIcon={<Send />}
            sx={{ mt: 2, mr: 4, mb: 2 ,ml:3}}
          >
            Send
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ViewDetailTeamLead;
