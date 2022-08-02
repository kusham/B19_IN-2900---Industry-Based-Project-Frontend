import { Grid } from "@mui/material";
import React from "react";
// import InterviewerCalender from "../../../Components/RecruitmentModule/InterviewerCalender/InterviewerCalender";
import InterviewList from "../../../Components/RecruitmentModule/InterviewList/InterviewList";
import InterviewPageHead from "../../../Components/RecruitmentModule/InterviewPageHead/InterviewPageHead";
import InterviewStats from "../../../Components/RecruitmentModule/InterviewStats/InterviewStats";
import RecentCandidate from "../../../Components/RecruitmentModule/RecentCandidates/RecentCandidate";

const Interviews = ({ open }) => {
  return (
    <Grid container sx={{ p: 4 }} spacing={3}>
      <Grid item md={8}>
        <Grid container>
          <Grid item sm={12} md={12}>
            <InterviewStats />
          </Grid>
          <Grid item sm={12} md={12}>
            <InterviewPageHead />
          </Grid>
          <Grid
            item
            sm={12}
            md={12}
            sx={{
              mt: 2,
            }}
          >
            <InterviewList open={open} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        {/* <Grid>
        <InterviewerCalender />

        </Grid> */}
        <Grid>
          <RecentCandidate createFrom={false}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Interviews;
