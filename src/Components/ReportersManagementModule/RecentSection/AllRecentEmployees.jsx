import { useState, useEffect, React } from "react";
import { Box, Grid } from "@mui/material";
import RecentEmployee from "./RecentEmployee";
import { recentEmployees } from "../../../Api/ReportersManagementModule/EmployeeApi";
import Carousel, { autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Scrollbars from "react-custom-scrollbars";
// import Carousel from 'react-material-ui-carousel'
function AllRecentEmployees() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setProfiles(await recentEmployees());
    }
    fetchData();
  }, []);

  return (
    <div>
      <Scrollbars style={{ height: 500, width: 400 }}>
        <Box maxWidth={400} sx={{ mt: 5 }}>
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            {/* <Carousel
            plugins={[
              "infinite",
              {
                resolve: autoplayPlugin,
                options: {
                  interval: 2000,
                },
              },
            ]}
            animationSpeed={1000}
          > */}
            {profiles &&
              profiles.map((prof) => {
                return (
                  <div key={prof._id}>
                    <Grid item xs={12} sm={6} md={4} component="span">
                      <RecentEmployee profile={prof} />
                    </Grid>
                  </div>
                );
              })}
            {/* </Carousel> */}
          </Grid>
        </Box>
      </Scrollbars>
    </div>
  );
}

export default AllRecentEmployees;
