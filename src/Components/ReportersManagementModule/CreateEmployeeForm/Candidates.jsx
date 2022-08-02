import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

function Candidates({
  candidates,
  setInputs,
  isDisableCandidate,
  inputErrors,
  setInputErrors,
}) {
  // const [candidates, setCandidates] = useState();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  // const [isDisable, setIsDisable] = useState(true);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    //   async function fetchData() {
    //     setCandidates(await getCandidates());
    //   }
    //   fetchData();
    //   if (!(candidates && candidates.length > 0)) {
    //     setIsDisable(false);
    //   }
    //   if (candidates && candidates.length === 0) {
    //     setIsDisable(true);
    //   }

    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const handleClick = (candidate) => {
    setInputErrors({
      ...inputErrors,
      NIC: "",
      jobRole: "",
      employeeFirstName: "",
      employeeLastName: "",
      companyEmail: "",
    });
    setInputs((prevState) => ({
      ...prevState,
      NIC: candidate.NIC,
      jobRole: candidate.appliedPosition,
      employeeFirstName: candidate.candidateName.split(" ")[0],
      employeeLastName: candidate.candidateName.split(" ")[1],
      companyEmail: candidate.email,
    }));
  };

  return (
    <div>
      <Button
        disabled={isDisableCandidate}
        onClick={handleClickOpen("paper")}
        variant="contained"
        sx={{
          backgroundColor: "#183d78",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#4d5575",
            color: "#fff",
          },
        }}
      >
        Selected Candidates
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
          Selected Candidates
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {candidates &&
            candidates.map((candidate) => (
              <Card
                key={candidate.NIC}
                onClick={() => {
                  handleClick(candidate);
                }}
                sx={{
                  padding: 2,
                  backgroundColor: "#d7dde0",
                  mb: 1,
                  backgroundImage: `linear-gradient(to right, rgba(228, 241, 247), rgba(215, 221, 224))`,
                }}
              >
                <Typography>{candidate.candidateName}</Typography>
                <Typography>{candidate.appliedPosition}</Typography>
                <Typography>{candidate.NIC}</Typography>
                <Typography>{candidate.email}</Typography>
              </Card>
            ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
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

export default Candidates;
