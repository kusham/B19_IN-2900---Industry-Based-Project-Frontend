import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { searchCandidate } from "../../../Api/RecruitmentModule/CandidateApi";
import { Email, Menu, Phone } from "@mui/icons-material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  useStyles,
} from "./SearchCandidateStyles";
import Scrollbars from "react-custom-scrollbars";
import ViewCandidateCV from "../ViewCandidateCV/ViewCandidateCV";
import InterviewResult from "../InterviewResult/InterviewResult";
import { getInterviewResult } from "../../../Api/RecruitmentModule/InterviewApi";

const SearchCandidate = ({
  setCandidateData,
  setCandidateId,
  setSearching,
  searching,
}) => {
  const [NIC, setNIC] = useState("");
  const [candidates, setCandidates] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [interviewResult, setInterviewResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setCandidates(await searchCandidate(NIC));
    }
    if (NIC) fetchData();
  }, [NIC]);
  const handleUpdate = (candidate) => {
    setCandidateData({
      firstName: candidate.candidateName.split(" ")[0],
      lastName: candidate.candidateName.split(" ")[1],
      appliedPosition: candidate.appliedPosition,
      NIC: candidate.NIC,
      phoneNumber: candidate.phoneNumber,
      email: candidate.email,
      cv: candidate.cv,
    });
    setCandidateId(candidate._id);
    setCandidates(null);
    handleClear();
  };
  const handleOnChange = (event) => {
    setNIC(event.target.value);
    setSearching(true);
  };
  const handleClear = () => {
    setNIC("");
    setSearching(false);
    setCandidates(null);
  };

  const handleOpenDialog = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog2 = () => {
    setOpenDialog2(true);
  };

  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
    setSelectedCandidate(null);
  };

  const viewInterviewResult = async (interviewType, candidate) => {
    setSelectedCandidate(candidate);
    setInterviewResult(await getInterviewResult(interviewType, candidate._id));

    handleOpenDialog2();
  };

  const classes = useStyles();
  return (
    <Box sx={{ mb: 2 }}>
      <Paper className={classes.paper}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Search Candidate
          </Typography>
          {searching && (
            <Button
              onClick={handleClear}
              variant="contained"
              color="inherit"
              size="small"
            >
              Clear
            </Button>
          )}
          <Search>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              value={NIC}
              onChange={(event) => handleOnChange(event)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </Paper>

      {searching && (
        <Grid container sx={{ mt: 3 }}>
          <Scrollbars style={{ height: 530 }}>
            {!candidates ? (
              <Grid container className={classes.skeleton} spacing={4}>
                <Grid item md={4}>
                  <Skeleton variant="rectangular" width={250} height={200} />
                </Grid>
                <Grid item md={4}>
                  <Skeleton variant="rectangular" width={250} height={200} />
                </Grid>
                <Grid item md={4}>
                  <Skeleton variant="rectangular" width={250} height={200} />
                </Grid>
                <Grid item md={4}>
                  <Skeleton variant="rectangular" width={250} height={200} />
                </Grid>
                <Grid item md={4}>
                  <Skeleton variant="rectangular" width={250} height={200} />
                </Grid>
                <Grid item md={4}>
                  <Skeleton variant="rectangular" width={250} height={200} />
                </Grid>
                <Grid item md={4}>
                  <Skeleton variant="rectangular" width={250} height={200} />
                </Grid>
                <Grid item md={4}>
                  <Skeleton variant="rectangular" width={250} height={200} />
                </Grid>
                <Grid item md={4}>
                  <Skeleton variant="rectangular" width={250} height={200} />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={3}>
                {candidates.map((candidate) => (
                  <Grid item md={4}>
                    <Card
                      sx={{ "&:hover": {transform: "scale3d(1.05, 1.05, 3)"} }}
                      elevation={3}
                      key={candidate._id}
                    >
                      <CardActionArea onClick={() => handleUpdate(candidate)}>
                        <CardHeader
                        sx={{bgcolor: "rgba(119, 120, 135, 0.2)"}}
                          className={classes.cardHeader}
                          avatar={
                            <Avatar sx={{ bgcolor: "purple" }}>
                              {candidate.candidateName[0].toUpperCase()}
                            </Avatar>
                          }
                          title={candidate.candidateName}
                          subheader={candidate.NIC}
                        />

                        <Divider />

                        <Grid container className={classes.cardContent}>
                          <Grid item md={6} sx={{ display: "flex" }}>
                            <Email sx={{ mr: 1 }} />
                            <Typography>{candidate.email}</Typography>
                          </Grid>
                          <Grid item md={6} sx={{ display: "flex" }}>
                            <Phone sx={{ mr: 1 }} />
                            <Typography>{candidate.phoneNumber}</Typography>
                          </Grid>
                        </Grid>
                        <Divider />
                      </CardActionArea>
                      <Grid container className={classes.cvButton}>
                        <Button onClick={() => handleOpenDialog(candidate)}>
                          CV
                        </Button>
                        <Button
                          onClick={() => viewInterviewResult("HR", candidate)}
                        >
                          HR
                        </Button>
                        <Button
                          onClick={() =>
                            viewInterviewResult("Technical", candidate)
                          }
                        >
                          Technical
                        </Button>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Scrollbars>
        </Grid>
      )}
      {selectedCandidate && (
        <ViewCandidateCV
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          candidateData={selectedCandidate}
        />
      )}
      {selectedCandidate && (
        <InterviewResult
          openDialog={openDialog2}
          handleCloseDialog={handleCloseDialog2}
          selectedCandidates={selectedCandidate}
          interviewResult={interviewResult}
        />
      )}
    </Box>
  );
};

export default SearchCandidate;

// <Paper
//       elevation={5}
//       sx={{
//         display: "flex",
//         alignItems: "flex-end",
//         p: "15px 5px 30px 20px",
//       }}
//     >
//       <Grid container>
//         <Grid item md={12} sx={{ display: "flex", alignItems: "flex-end" }}>
//           <AccountCircleIcon fontSize="large" sx={{ mr: 2 }} />
//           <TextField
//             label="Search by NIC"
//             variant="standard"
//             autoComplete="off"
//             value={NIC}
//             onChange={(event) => setNIC(event.target.value)}
//           />
//         </Grid>
//         <Grid item md={12} sx={{ mt: 4 }}>
//           {candidates &&
//             candidates.map((candidate) => (
//               <Card elevation={3} key={candidate._id} sx={{ mb: 3, p: 1 }}>
//                 <CardActionArea
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "flex-start",
//                     p: 1,
//                   }}
//                   onClick={() => handleUpdate(candidate)}
//                 >
//                   <Avatar sx={{ bgcolor: "blue" }}>
//                     {candidate.candidateName[0].toUpperCase()}
//                   </Avatar>
//                   <Grid>
//                     <Typography
//                       sx={{ ml: 2, fontSize: 17, fontWeight: 430, mb: -0.5 }}
//                     >
//                       {candidate.candidateName}
//                     </Typography>
//                     <Typography
//                       variant="subtitle2"
//                       color={"gray"}
//                       sx={{ ml: 2 }}
//                     >
//                       {candidate.NIC}
//                     </Typography>
//                   </Grid>
//                 </CardActionArea>
//               </Card>
//             ))}
//         </Grid>
//       </Grid>
//     </Paper>
