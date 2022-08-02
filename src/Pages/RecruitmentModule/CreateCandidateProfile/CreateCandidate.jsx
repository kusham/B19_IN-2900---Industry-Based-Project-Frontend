import { Grid } from "@mui/material";
import React, { useState } from "react";
import CreateCandidateForm from "../../../Components/RecruitmentModule/CreateCandidateForm/CreateCandidateForm";
import SearchCandidate from "../../../Components/RecruitmentModule/SearchCandidate/SearchCandidate";
import RecentCandidate from "../../../Components/RecruitmentModule/RecentCandidates/RecentCandidate"
const CreateCandidate = () => {
  const [candidateData, setCandidateData] = useState({
    firstName: "",
    lastName: "",
    NIC: "",
    appliedPosition: "",
    phoneNumber: "",
    email: "",
    cv: "",
  });
  const [candidateId, setCandidateId] = useState(null);
  const [searching, setSearching] = useState(false);

  return (
    <Grid container sx={{ p: 4 }} spacing={3}>
      <Grid item sm={12} md={8}>
        <SearchCandidate
          setCandidateData={setCandidateData}
          setCandidateId={setCandidateId}
          setSearching={setSearching}
          searching={searching}
        />
        {!searching && (
          <CreateCandidateForm
            candidateData={candidateData}
            setCandidateData={setCandidateData}
            candidateId={candidateId}
          />
        )}
      </Grid>
      <Grid item sm={3} md={4} sx={{mt: 2}}>
        <RecentCandidate createFrom={true}/>
      </Grid>
    </Grid>
  );
};

export default CreateCandidate;
