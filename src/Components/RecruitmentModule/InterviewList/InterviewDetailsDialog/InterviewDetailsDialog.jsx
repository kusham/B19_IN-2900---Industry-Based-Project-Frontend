import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  AccountCircle,
  CalendarMonth,
  CallSplit,
  Close,
} from "@mui/icons-material";
import useStyles from "./InterviewDetailsDialogStyles";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const InterviewDetailsDialog = ({
  openDialog,
  handleCloseDialog,
  interview,
  handleCancelInterview,
  setOpenConfirmation,
  openConfirmation,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      open={openDialog}
      onClose={handleCloseDialog}
      PaperProps={{
        style: { borderRadius: 40 },
      }}
    >
      <DialogTitle sx={{ background: "linear-gradient(45deg, rgba(39, 200, 245, 0.8), rgba(7, 57, 172, 0.8))",}}>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid sm={10} md={10} item>
            <Typography color="white" fontWeight={500} variant="h5">
              Interview
            </Typography>
          </Grid>

          <Grid
            sm={2}
            md={2}
            item
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton sx={{ color: "white" }} onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <Grid className={classes.item}>
          <Typography fontFamily={"Rubik"}>
            <AccountCircle sx={{ mr: 1 }} /> Candidate :{" "}
          </Typography>
          <Typography fontWeight={600} sx={{ ml: 2 }}>
            {interview && interview.candidate.candidateName}
          </Typography>
        </Grid>

        <Grid className={classes.item}>
          <Typography fontFamily={"Rubik"}>
            {" "}
            <CallSplit sx={{ mr: 1 }} /> Interview Type :
          </Typography>
          <Typography fontWeight={600} sx={{ ml: 2 }}>
            {interview && interview.InterviewType} Interview
          </Typography>
        </Grid>

        <Grid className={classes.item}>
          <Typography fontFamily={"Rubik"}>
            {" "}
            <CalendarMonth sx={{ mr: 1 }} />
            Interview Date :{" "}
          </Typography>
          <Typography fontWeight={600} sx={{ ml: 2 }}>
            {interview && new Date(interview.InterviewDate).toDateString()}
          </Typography>
        </Grid>
        <Grid className={classes.item}>
          <Typography fontFamily={"Rubik"}>
            <AccessTime sx={{ mr: 1 }} />
            Interview Time :{" "}
          </Typography>
          <Typography fontWeight={600} sx={{ ml: 2 }}>
            {interview && interview.InterviewTime}
          </Typography>
        </Grid>
        <Divider />
        <Grid className={classes.item}>
          <Typography fontFamily={"Rubik"}>Interviewers : </Typography>
          <Typography sx={{ ml: 2, listStyle: "none" }}>
            {interview &&
              interview.Interviewers.map((interviewer) => (
                <li key={interviewer._id} component="span">
                  <Grid sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar src={interviewer.profilePic} sx={{ mr: 1 }} />
                    {interviewer.employeeFirstName +
                      " " +
                      interviewer.employeeLastName}
                  </Grid>
                </li>
              ))}
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        {interview &&
          (new Date() < new Date(interview.InterviewDate) ? (
            <Grid container className={classes.buttons}>
              <Grid item md={6}>
                <Button
                  onClick={() => setOpenConfirmation(true)}
                  size="small"
                  color="warning"
                  variant="contained"
                >
                  Cancel Interview
                </Button>
              </Grid>
              <Grid item md={6} className={classes.buttonUpdate}>
                <Button
                  component={Link}
                  to={`/interview/update/${interview._id}`}
                  state={{ interview }}
                  size="small"
                  color="secondary"
                  variant="contained"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item md={6} className={classes.buttonUpdate}>
              <Button
                component={Link}
                to={`/interview/start/${interview._id}`}
                state={{ interview }}
                size="small"
                color="secondary"
                variant="contained"
              >
                Start
              </Button>
            </Grid>
          ))}
      </DialogActions>

      <ConfirmationDialog
        setOpenConfirmation={setOpenConfirmation}
        openConfirmation={openConfirmation}
        handleCancelInterview={handleCancelInterview}
      />
    </Dialog>
  );
};

export default InterviewDetailsDialog;
