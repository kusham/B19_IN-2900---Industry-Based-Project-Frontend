import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import useStyles from ".././InterviewDetailsDialog/InterviewDetailsDialogStyles";

const ConfirmationDialog = ({
  handleCancelInterview,
  setOpenConfirmation,
  openConfirmation,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
      <DialogContent>
        <Typography>
          Are you sure you want to cancel this interview ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item sm={6} md={6} className={classes.yesNoButtons}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setOpenConfirmation(false)}
            >
              No
            </Button>
          </Grid>
          <Grid item sm={6} md={6} className={classes.yesNoButtons}>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelInterview}
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
