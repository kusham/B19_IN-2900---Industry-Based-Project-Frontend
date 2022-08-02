import { ContactSupportOutlined } from "@mui/icons-material";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { add } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { updateOrganization } from "../../../Api/ReportersManagementModule/OrganizationApi";

import useStyles from "../DisplayAndUpdateLevels/LevelsStyles";
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

function LevelUpdateDialog({
  setRender,
  level,
  render

}) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [jobRoles, setjobRoles] = useState(level.jobRole);


  
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = async (position) => {
    
    const response = await updateOrganization(jobRoles, level._id);
    if(response.success) {
      setRender(!render)
      setOpen(false);
    }
    
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  
  const handleDelete = (job) => {
    setjobRoles(jobRoles.filter((role) => role !== job));
  };
  

  const classes = useStyles();
  return (
    <div>
      <Button
        className={classes.button}
        onClick={handleClickOpen("paper")}
        variant="contained"
        sx={{
          backgroundColor: "#183d78",
        }}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ color: "#183d78", fontWeight: "bold" }}
        >
          Update Level
        </DialogTitle>
        <form autoComplete="off">
          <DialogContent dividers={scroll === "paper"}>
            <TextField
              id="filled-basic"
              variant="filled"
              name="jobRole"
              select
              onChange={(event) => {
                setjobRoles(jobRoles.concat(event.target.value));
              }}
              //   error={inputErrors.teamName ? true : false}
              //   helperText={inputErrors.teamName}
              fullWidth
            >
              {positions.map((position) => (
                <MenuItem value={position} key={position}>
                  {position}
                </MenuItem>
              ))}
            </TextField>
            <Grid>
              {jobRoles &&
                jobRoles.map((job, i) => (
                  //    console.log(job.jobRole)
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
          </DialogContent>
        </form>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={jobRoles.length === 0? true: false}
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#183d78",
              textAlign: "center",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LevelUpdateDialog;
