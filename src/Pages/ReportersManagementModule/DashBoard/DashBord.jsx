import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link, useLocation } from "react-router-dom";
import OrganizationStructure from "../../../Components/ReportersManagementModule/OrganizationStructure/OrganizationStructure";
import DisplayAllEmployees from "./DisplayAllEmployees";
import { viewAllEmployees } from "../../../Api/ReportersManagementModule/EmployeeApi";
import RecentSection from "./RecentSection";
import useStyles from "./DashboardStyles";
function DashBord() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const location = useLocation();

  const [value, setValue] = React.useState("1");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (location.state) {
      setValue(location.state.allEmployees === true ? "2" : " 1");

      window.history.replaceState({}, document.title);
    }

    async function fetchData() {
      setProfiles(await viewAllEmployees());
    }
    fetchData();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div>
      <Box padding={2} bgcolor="#E0F7FA">
        <Grid container>
          <Grid item sm={12} md={2.5} sx={{ mb: 5 }}>
            {/* {user && user.jobRole === "HR Manager" && (
              <Button
                className={classes.button}
                LinkComponent={Link}
                to={"/dashboard/create"}
                type="button"
                variant="contained"
                sx={{ backgroundColor: "#183d78" }}
                startIcon={<AddBoxIcon />}
              >
                CAREATE NEW EMPLOYEE
              </Button>
            )} */}
          </Grid>
          <Grid item sm={12} md={4} sx={{ mb: 5 }}>
            {/* {jobRole === "HR Manager" && (
              <Button
                className={classes.button}
                LinkComponent={Link}
                to={"/dashboard/organization/create"}
                type="button"
                variant="contained"
                sx={{ backgroundColor: "#183d78" }}
              >
                Organization levels
              </Button>
            )} */}
          </Grid>
        </Grid>
        <Grid item sm={12} md={12}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="RECENT EMPLOYEE SECTION" value="1" />
                  <Tab label="ALL EMPLOYEES" value="2" />
                  <Tab label="ORGANIZATION STRUCTURE" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box>
                  {/* <Grid container>
                    <Grid item md={8}></Grid>
                    <Grid item md={4}> */}
                  {/* <AllRecentEmployees /> */}
                  <RecentSection />
                  {/* </Grid>
                  </Grid> */}
                </Box>
              </TabPanel>
              <TabPanel value="2" sx={{ mt: 1 }}>
                <DisplayAllEmployees profiles={profiles} setProfiles={setProfiles}/>
              </TabPanel>
              <TabPanel value="3">
                <OrganizationStructure />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Box>
    </div>
  );
}

export default DashBord;
