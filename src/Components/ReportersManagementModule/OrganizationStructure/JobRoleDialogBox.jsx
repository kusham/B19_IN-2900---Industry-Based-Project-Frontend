import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  Divider,
  IconButton,
  Typography,
  Grid,
  TextField,
  Chip,
  MenuItem,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";

const JobRoleDialogBox = ({
  openDialog,
  setOpenDialog,
  organizationInputs,
  setOrganizationInputs,
}) => {
  const [jobroles, setJobroles] = useState([]);

  const positions = [
    "Software Engineer",
    "Senior Software Engineer",
    "HR Manager",
    "IT Employee",
    "CTO",
    "Associate Software Engineer",
    "Software Architect",
    "Tech Lead",
    "UI/UX Designer",
    "Business Analyst",
    "Intern",
    "Product Manager",
  ];

  const handleSave = () => {
    setOrganizationInputs({ ...organizationInputs, jobRole: jobroles });
    setOpenDialog(false);
  };

  const handleDelete = (job) => {
    setJobroles(jobroles.filter((jobrole) => jobrole !== job));
  };

  return (
    <Dialog fullWidth open={openDialog}>
      <DialogTitle>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid md={10} item>
            <Typography variant="h5">Job Roles</Typography>
          </Grid>

          <Grid
            md={2}
            item
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton onClick={() => setOpenDialog(false)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider variant="middle" />
      <Divider variant="middle" />
      <DialogContent>
        <Typography variant="subTitle">Add Job Roles</Typography>
        <Grid>
          {jobroles &&
            jobroles.map((job, i) => (
              <Chip
                label={job}
                key={i}
                onDelete={() => handleDelete(job)}
                sx={{
                  mr: 0.5,
                  mt: 1,
                  bgcolor: "rgba(49, 24, 62, 1)",
                  color: "white",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
              />
            ))}
        </Grid>
        <TextField
          label="Job Roles"
          variant="filled"
          name="jobrole"
          select
          value=""
          onChange={(event) => {
            setJobroles(jobroles.concat(event.target.value));
          }}
          fullWidth
          sx={{ mt: 3 }}
        >
          {positions &&
            positions.map((position, j) => (
              <MenuItem value={position} key={j}>
                {position}
              </MenuItem>
            ))}
        </TextField>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleSave}
            variant="contained"
            color="success"
            sx={{ borderRadius: 8 }}
          >
            <Send sx={{ mr: 0.5 }} /> Save
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default JobRoleDialogBox;
