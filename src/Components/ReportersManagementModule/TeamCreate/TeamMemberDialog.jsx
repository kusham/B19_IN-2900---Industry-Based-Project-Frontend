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
  Avatar,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";

const TeamMemberDialog = ({
  openDialog,
  setOpenDialog,
  teaminputs,
  setTeaminputs,
  employees,
  setEmployee,
}) => {
  const [members, setMembers] = useState([]);

  const handleSave = () => {
    setTeaminputs({ ...teaminputs, teamMembers: members });
    setOpenDialog(false);
  };

  const handleDelete = (member) => {
    setMembers(members.filter((membr) => membr !== member));
    setEmployee(employees.concat(member));
  };

  return (
    <Dialog fullWidth open={openDialog}>
      <DialogTitle>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid md={10} item>
            <Typography variant="h5">Team Members</Typography>
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
        <Typography variant="subTitle">Add Team Members</Typography>
        <Grid>
          {members &&
            members.map((member) => (
              <Chip
                label={member.employeeName}
                key={member.employeeID}
                onDelete={() => handleDelete(member)}
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
          label="Team Members"
          variant="filled"
          name="members"
          select
          value=""
          onChange={(event) => {
            setMembers(members.concat(event.target.value));

            setEmployee(employees.filter((mem) => mem !== event.target.value));
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
                      sx={{ height: 35, width: 35 }}
                      src={employee.profilePic}
                    >
                      {employee.employeeName.toUpperCase()}
                    </Avatar>
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

export default TeamMemberDialog;
