import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  cancelInterview,
  getInterviewList,
} from "../../../Api/RecruitmentModule/InterviewApi";
import {
  Avatar,
  AvatarGroup,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import InterviewDetailsDialog from "./InterviewDetailsDialog/InterviewDetailsDialog";
import SnackBar from "../../SnackBar/SnackBar";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./InterviewListStyles";
import { MoreVert } from "@mui/icons-material";
import ConfirmationDialog from "./ConfirmationDialog/ConfirmationDialog";

const InterviewList = ({ open }) => {
  const [interviewList, setInterviewList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const openMenu = Boolean(anchorEl);
  const location = useLocation();

  const fetchData = async () => {
    setInterviewList(await getInterviewList());
  };
  useEffect(() => {
    fetchData();
    if (location.state) setOpenSnackBar(location.state.success);
    window.history.replaceState(location.pathname, null);
  }, [location]);

  const handleCancelInterview = async () => {
    const response = await cancelInterview(selectedInterview._id);
    setInterviewList(
      interviewList.filter((Interview) => selectedInterview !== Interview)
    );
    handleCloseDialog();
    setOpenConfirmation(false);
    location.state = response;
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleViewDetails = () => {
    setOpenDialog(true);
  };
  const handleOpenMenu = (event, interview) => {
    setSelectedInterview(interview);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <Paper elevation={6} className={classes.paper}>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>
              <Typography>Candidate</Typography>
            </TableCell>
            <TableCell>
              <Typography>Interview Type</Typography>
            </TableCell>
            <TableCell>
              <Typography>Interview Date</Typography>
            </TableCell>
            <TableCell>
              <Typography>Interview Time</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Interviewers</Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interviewList &&
            interviewList.map((interview) => (
              <TableRow key={interview._id} className={classes.tableRow}>
                <TableCell>
                  <Typography>{interview.candidate.candidateName}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{interview.InterviewType}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {new Date(interview.InterviewDate).toDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography> {interview.InterviewTime}</Typography>
                </TableCell>
                <TableCell align="left">
                  <AvatarGroup total={interview.Interviewers.length}>
                    {interview.Interviewers &&
                      interview.Interviewers.map((interviewer) => (
                        <Avatar
                          sizes="small"
                          key={interviewer._id}
                          src={interviewer.profilePic}
                          className={classes.avatar}
                        />
                      ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(event) => {
                      handleOpenMenu(event, interview);
                    }}
                    aria-controls={openMenu ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 1px 9px rgba(0,0,0,0.1))",
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleViewDetails}>View more</MenuItem>

                    {selectedInterview &&
                      (new Date() <
                      new Date(selectedInterview.InterviewDate) ? (
                        <>
                          <MenuItem
                            component={Link}
                            to={`/interview/update/${interview._id}`}
                            state={{ interview: selectedInterview }}
                          >
                            Update
                          </MenuItem>
                          <MenuItem onClick={() => setOpenConfirmation(true)}>
                            Cancel
                          </MenuItem>
                        </>
                      ) : (
                        <Grid container>
                          <MenuItem
                            component={Link}
                            to={`/interview/start/${interview._id}`}
                            state={{ interview: selectedInterview }}
                          >
                            start
                          </MenuItem>
                        </Grid>
                      ))}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <InterviewDetailsDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        interview={selectedInterview}
        handleCancelInterview={handleCancelInterview}
        setOpenConfirmation={setOpenConfirmation}
        openConfirmation={openConfirmation}
      />
      <ConfirmationDialog
        setOpenConfirmation={setOpenConfirmation}
        openConfirmation={openConfirmation}
        handleCancelInterview={handleCancelInterview}
      />

      <SnackBar
        handleCloseSnackBar={handleCloseSnackBar}
        openSnackBar={openSnackBar}
        message={location.state && location.state.message}
      />
    </Paper>
  );
};
export default InterviewList;
