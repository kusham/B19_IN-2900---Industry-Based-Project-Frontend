import { Email, Fingerprint, Phone } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import ViewCandidateCV from "../ViewCandidateCV/ViewCandidateCV";
import useStyles from "./MarkingStyles";

const CandidateProfile = ({ interview }) => {
  const classes = useStyles();
  const phoneNumber = interview.candidate.phoneNumber;

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <Paper sx={{ borderRadius: 4 }} elevation={4}>
      <Grid container className={classes.profile}>
        <Avatar />
        <Typography variant="h6" sx={{ mt: 1, mb: -1.5 }}>
          {interview.candidate.candidateName}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {interview.candidate.appliedPosition}
        </Typography>
      </Grid>

      <Grid container className={classes.cv}>
        <Button onClick={handleOpenDialog} variant="outlined">
          CV
        </Button>
        <ViewCandidateCV
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          candidateData={interview.candidate}
        />
      </Grid>

      <Divider variant="middle" />

      <Grid container sx={{ pb: 3 }}>
        <Grid item md={12} className={classes.contact}>
          <Phone color="primary" sx={{ mr: 1 }} />
          <Typography>
            ({phoneNumber.slice(0, 3)}){" " + phoneNumber.slice(3, 4) + " "}
            {phoneNumber.slice(4, 7) + " "}
            {phoneNumber.slice(7, 10)}
          </Typography>
        </Grid>

        <Grid item md={12} className={classes.contact}>
          <Email color="primary" sx={{ mr: 1 }} />
          <Typography> {interview.candidate.email}</Typography>
        </Grid>
        <Grid item md={12} className={classes.contact}>
          <Fingerprint color="primary" sx={{ mr: 1 }} />
          <Typography> {interview.candidate.NIC}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CandidateProfile;
