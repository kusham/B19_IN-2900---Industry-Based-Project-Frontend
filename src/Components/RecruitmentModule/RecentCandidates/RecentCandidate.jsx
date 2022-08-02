import { MoreVert } from "@mui/icons-material";
import {
  Badge,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchRecentCandidates } from "../../../Api/RecruitmentModule/CandidateApi";
import useStyles from "./RecentCandidateStyles";
import { Scrollbars } from "react-custom-scrollbars";
import { getInterviewResult } from "../../../Api/RecruitmentModule/InterviewApi";
import InterviewResult from "../InterviewResult/InterviewResult";

const RecentCandidate = ({createFrom}) => {
  const [candidates, setCandidates] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const openMenu = Boolean(anchorEl);
  const [interviewResult, setInterviewResult] = useState(null);

  const handleOpenMenu = (event, candidate) => {
    setSelectedCandidates(candidate);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewInterviewResult = async (interviewType) => {
    setInterviewResult(
      await getInterviewResult(interviewType, selectedCandidates._id)
    );

    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCandidates(null);
  };

  const fetchData = async () => {
    setCandidates(await fetchRecentCandidates());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.title} variant="h5">
        Recent Candidates
      </Typography>
      <Paper elevation={5} className={classes.paper}>
        <Scrollbars style={{ height: createFrom?520: 645 }}>
          {!candidates ? (
            <Grid className={classes.skeleton}>
              <Skeleton variant="rectangular" width={410} height={60} />
              <Skeleton variant="rectangular" width={410} height={60} />
              <Skeleton variant="rectangular" width={410} height={60} />
              <Skeleton variant="rectangular" width={410} height={60} />
              <Skeleton variant="rectangular" width={410} height={60} />
              <Skeleton variant="rectangular" width={410} height={60} />
              <Skeleton variant="rectangular" width={410} height={60} />
              <Skeleton variant="rectangular" width={410} height={60} />
            </Grid>
          ) : candidates.length === 0 ? (
            <Typography sx={{ mt: 1 }}>Candidate not available</Typography>
          ) : (
            candidates.map((candidate) => (
              <Grid key={candidate._id} container className={classes.candidate}>
                <Grid item className={classes.name} md={8}>
                  <Typography variant="title">
                    {candidate.candidateName}
                  </Typography>
                  <Typography variant="body">{candidate.NIC}</Typography>
                </Grid>
                <Grid item className={classes.status} md={3}>
                  <Badge
                    sx={{ mr: 1 }}
                    color={
                      candidate.status === "Recruited"
                        ? "success"
                        : candidate.status === "Rejected"
                        ? "error"
                        : "primary"
                    }
                    var
                    overlap="circular"
                    variant="dot"
                  />
                  <Typography
                    color={
                      candidate.status === "Recruited"
                        ? "green"
                        : candidate.status === "Rejected"
                        ? "error"
                        : "primary"
                    }
                    variant="body"
                  >
                    {candidate.status}
                  </Typography>
                </Grid>
                <Grid item md={1} className={classes.MoreVert} >
                  <IconButton
                    onClick={(event) => {
                      handleOpenMenu(event, candidate);
                    }}
                    aria-controls={openMenu ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    disabled={candidate.status === "Initiated" ? true : false}
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
                        filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.1))",
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
                    <MenuItem onClick={() => viewInterviewResult("Technical")}>
                      Technical Interview
                    </MenuItem>
                    <MenuItem onClick={() => viewInterviewResult("HR")}>
                      HR Interview
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            ))
          )}
        </Scrollbars>
      </Paper>
      {selectedCandidates && (
        <InterviewResult
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          selectedCandidates={selectedCandidates}
          interviewResult={interviewResult}
        />
      )}
    </Box>
  );
};

export default RecentCandidate;
