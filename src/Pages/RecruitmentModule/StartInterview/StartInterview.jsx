import { Box, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import CandidateProfile from "../../../Components/RecruitmentModule/InterviewMarking/CandidateProfile";
import InterviewPanel from "../../../Components/RecruitmentModule/InterviewMarking/InterviewPanel";
import MarkingSheet from "../../../Components/RecruitmentModule/InterviewMarking/MarkingSheet";

const StartInterview = () => {
  const location = useLocation();
  const { interview } = location.state;
  return (
    <Box sx={{ m: 4 }}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={9}>
          <MarkingSheet interview={interview}/>
        </Grid>
        <Grid item sm={12} md={3} sx={{}}>
          <CandidateProfile interview = {interview} />
          <InterviewPanel interview = {interview}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StartInterview;
