import { useState, useEffect, React } from "react";
import { Grid } from "@mui/material";
import DisplayTeam from "./DisplayTeam";
import { viewAllTeams } from "../../../Api/ReportersManagementModule/TeamsApi";

function DisplayTeams() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setTeams(await viewAllTeams());
    }
    fetchData();
  }, []);

  return (
    <div component="div">
      <Grid
        container
        sx={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        {teams &&
          teams.map((tm) => {
            return (
              <div key={tm._id} component="div">
                <Grid item xs={12} sm={6} md={6} component="div" padding={2}>
                  <DisplayTeam team={tm} />
                </Grid>
              </div>
            );
          })}
      </Grid>
    </div>
  );
}

export default DisplayTeams;
