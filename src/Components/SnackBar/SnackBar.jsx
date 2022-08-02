import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React from "react";

const SnackBar = ({ handleCloseSnackBar, openSnackBar, message }) => {
  return (
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
        {message && message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
