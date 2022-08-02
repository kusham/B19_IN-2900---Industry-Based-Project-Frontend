import {
  Typography,
  Dialog,
  DialogTitle,
  Grid,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";

import { useTheme } from "@mui/material/styles";

function CredentialCard({
  credentials,
  setIsDisable,
  isDisable,
  setCredentials,
}) {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCredentials(false);
    setIsDisable(true);
  };

  return (
    <div>
      <Button
        disabled={isDisable}
        variant="contained"
        sx={{
          marginBottom: "20px",
          backgroundColor: "#183d78",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#4d5575",
            color: "#fff",
          },
        }}
        onClick={handleClickOpen}
      >
        CREDENTIALS
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ padding: 4 }}>
          {"CREDENTIALS"}
        </DialogTitle>
        <DialogContent sx={{ padding: 2 }}>
          <DialogContentText>
            <Typography sx={{ fontWeight: "bold" }} component={"span"}>
              User Name :{credentials && credentials.username}
            </Typography>
            <br />
            <Typography sx={{ fontWeight: "bold" }} component={"span"}>
              Password :{credentials && credentials.password}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <Grid sx={{ display: "flex", justifyContent: "center", padding: 5 }}>
          <DialogActions>
            <Button
              onClick={handleClose}
              autoFocus
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "#04bf26",
                  boxShadow: "none",
                },
                backgroundColor: "#04bf26",
                fontWeight: "bold",
                borderRadius: 5,
              }}
            >
              Done
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}

export default CredentialCard;
