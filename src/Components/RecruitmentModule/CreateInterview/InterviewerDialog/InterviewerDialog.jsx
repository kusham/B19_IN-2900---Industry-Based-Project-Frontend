import React, { useState, useEffect } from "react";
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
  Avatar,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";

const InterviewerDialog = ({
  openDialog,
  setOpenDialog,
  setInterview,
  interview,
  employees,
  setInterviewErrors,
  setEmployees
}) => {
  const [interviewers, setInterviewers] = useState([]);
  useEffect(() => {
    if (interview.Interviewers) setInterviewers(interview.Interviewers);
  }, [interview.Interviewers]);

  const handleSave = () => {
    setInterview({ ...interview, Interviewers: interviewers });
    setOpenDialog(false);
    if (interviewers.length !== 0) {
      setInterviewErrors((prevState) => ({
        ...prevState,
        Interviewers: "",
      }));
    }
  };

  const handleDelete = (interviewer) => {
    setInterviewers(interviewers.filter((intWr) => intWr !== interviewer));
  };
  return (
    <Dialog fullWidth open={openDialog}>
      <DialogTitle>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid sm={10} md={10} item>
            <Typography variant="h5">Interviewers</Typography>
          </Grid>

          <Grid
            sm={2}
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
        <Typography variant="subTitle">
          add HR manager or team leader as interviewer
        </Typography>
        <Grid>
          {interviewers &&
            interviewers.map((interviewer) => (
              <Chip
                label={
                  interviewer.employeeName ||
                  interviewer.employeeFirstName +
                    " " +
                    interviewer.employeeLastName
                }
                key={interviewer.employeeID}
                onDelete={() => handleDelete(interviewer)}
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
          label="Interviewers"
          variant="filled"
          name="interviewers"
          select
          value=""
          onChange={(event) => {
            setInterviewers(interviewers.concat(event.target.value));
            setEmployees(employees.filter((employee)=> employee !== event.target.value))
          }}
          fullWidth
          sx={{ mt: 3 }}
        >
          {employees &&
            employees.map((employee) => (
              <MenuItem value={employee} key={employee.employeeID}>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Grid item>
                    <Avatar
                      src={employee.profilePic}
                      sx={{ height: 35, width: 35 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography sx={{ mb: -0.7, ml: 1 }}>
                      {employee.employeeName}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1.3 }}>
                      {employee.employeeID}
                    </Typography>
                  </Grid>
                </Grid>
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

export default InterviewerDialog;
