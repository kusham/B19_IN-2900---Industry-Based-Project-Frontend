import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  useStyles,
  ListItem,
  ListItem2,
  StyledBadge,
  Drawer,
} from "./SideBarStyles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Home from "@mui/icons-material/Home";
import DevicesIcon from "@mui/icons-material/Devices";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaidIcon from "@mui/icons-material/Paid";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import { Scrollbars } from "react-custom-scrollbars";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { GroupAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";

const SideBar = ({ open, toggleDrawer, user, handleLogOut }) => {
  const [openCollapse, setOpenCollapse] = useState({
    Assets: false,
    Leave: false,
    PayRolls: false,
    Promotion: false,
    Recruitment: false,
    Reporter: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    setSelectedIndex2(null);
  };
  const handleListItemClick2 = (index) => {
    setSelectedIndex2(index);
  };
  const styleProps = {
    display: open ? "flex" : "none",
    displayLogOut: open ? "none" : "flex",
    iconPadding: open ? 1 : 1,
  };

  const classes = useStyles(styleProps);
  return (
    <Box>
      <Drawer
        variant="permanent"
        open={open}
        classes={{ paper: classes.paper }}
      >
        <Grid
          component={Link}
          to="/user"
          sx={{ textDecoration: "none" }}
          className={classes.profile}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src={user.profilePic}
              sx={{ mt: 1, mb: 1, height: 50, width: 50 }}
            />
          </StyledBadge>

          <Grid className={classes.profileName}>
            <Typography color={"white"} variant="h6" sx={{ mb: -1 }}>
              Welcome !
            </Typography>
            <Typography color={"white"} variant="caption">
              {user.employeeFirstName + " " + user.employeeLastName}
            </Typography>
          </Grid>
        </Grid>

        <IconButton onClick={toggleDrawer} className={classes.icon}>
          <ChevronLeftIcon />
        </IconButton>

        <Grid className={classes.iconRow}>
          <IconButton className={classes.iconRowIcon}>
            <Home />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <DevicesIcon />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <AccessTimeIcon />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <PaidIcon />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <PeopleAltIcon />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <HowToRegIcon />
          </IconButton>
        </Grid>
        <Divider variant="middle" classes={{ root: classes.divider }} />
        <Divider
          variant="middle"
          classes={{ root: classes.divider }}
          sx={{ mb: 1 }}
        />

        <Scrollbars sx={{ width: 260, height: 300 }}>
          <Grid className={classes.navItem}>
            <ListItem
              component={Link}
              to="/dashboard"
              selected={selectedIndex === 0}
              onClick={() => {
                handleListItemClick(0);
                setOpenCollapse(false);
              }}
              className={classes.navButton}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Grid>

          <Grid className={classes.navItem}>
            <ListItem
              selected={selectedIndex === 1}
              onClick={() => {
                handleListItemClick(1);
                setOpenCollapse({ Assets: !openCollapse.Assets });
              }}
              className={classes.navButton}
            >
              <ListItemIcon>
                <DevicesIcon />
              </ListItemIcon>
              <ListItemText primary="Assets" />
              {openCollapse.Assets ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse.Assets} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {user.jobRole === "IT Employee" && (
                  <ListItem2
                    component={Link}
                    to="/assetInsertion"
                    selected={selectedIndex2 === 0}
                    onClick={() => {
                      handleListItemClick2(0);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Asset Insertion" />
                  </ListItem2>
                )}
                {(user.jobRole === "IT Employee" ||
                  user.jobRole === "HR Manager") && (
                  <ListItem2
                    component={Link}
                    to="/asset"
                    selected={selectedIndex2 === 1}
                    onClick={() => {
                      handleListItemClick2(1);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Asset List" />
                  </ListItem2>
                )}
                {user.jobRole !== "IT Employee" &&
                  user.jobRole !== "HR Manager" && (
                    <ListItem2
                      component={Link}
                      to="/availableAssets"
                      selected={selectedIndex2 === 1}
                      onClick={() => {
                        handleListItemClick2(1);
                      }}
                      className={classes.navButton2}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Available Asset" />
                    </ListItem2>
                  )}
              </List>
            </Collapse>
          </Grid>

          <Grid className={classes.navItem}>
            <ListItem
              selected={selectedIndex === 2}
              onClick={() => {
                handleListItemClick(2);
                setOpenCollapse({ Reporter: !openCollapse.Reporter });
              }}
              className={classes.navButton}
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary="Reporter" />
              {openCollapse.Reporter ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse.Reporter} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem2
                  component={Link}
                  to="/teams"
                  selected={selectedIndex2 === 0}
                  onClick={() => {
                    handleListItemClick2(0);
                  }}
                  className={classes.navButton2}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItem2>

                <ListItem2
                  component={Link}
                  to="/products"
                  selected={selectedIndex2 === 1}
                  onClick={() => {
                    handleListItemClick2(1);
                  }}
                  className={classes.navButton2}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItem2>

                {user.jobRole === "HR Manager" && (
                  <ListItem2
                    component={Link}
                    to="/dashboard/create"
                    selected={selectedIndex2 === 2}
                    onClick={() => {
                      handleListItemClick2(2);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Create Employee" />
                  </ListItem2>
                )}
              </List>
            </Collapse>
          </Grid>

          {(user.teamID || user.jobRole === "HR Manager") && (
            <Grid className={classes.navItem}>
              <ListItem
                selected={selectedIndex === 3}
                onClick={() => {
                  handleListItemClick(3);
                  setOpenCollapse({ Leave: !openCollapse.Leave });
                }}
                className={classes.navButton}
              >
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="Leaves" />
                {openCollapse.Leave ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openCollapse.Leave} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {user.jobRole !== "HR Manager" && (
                    <ListItem2
                      component={Link}
                      to="/leaveHistory"
                      selected={selectedIndex2 === 0}
                      onClick={() => {
                        handleListItemClick2(0);
                      }}
                      className={classes.navButton2}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Leave History" />
                    </ListItem2>
                  )}

                  {user.jobRole !== "HR Manager" && (
                    <ListItem2
                      component={Link}
                      to="/requestLeave"
                      selected={selectedIndex2 === 1}
                      onClick={() => {
                        handleListItemClick2(1);
                      }}
                      className={classes.navButton2}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Request Leave" />
                    </ListItem2>
                  )}

                  {user.teamLead && (
                    <ListItem2
                      component={Link}
                      to="/requestedLeaves"
                      selected={selectedIndex2 === 2}
                      onClick={() => {
                        handleListItemClick2(2);
                      }}
                      className={classes.navButton2}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Requested Leave" />
                    </ListItem2>
                  )}
                  {user.jobRole === "HR Manager" && (
                    <ListItem2
                      component={Link}
                      to="/increaseLeaves"
                      selected={selectedIndex2 === 3}
                      onClick={() => {
                        handleListItemClick2(3);
                      }}
                      className={classes.navButton2}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Increase Leaves" />
                    </ListItem2>
                  )}
                </List>
              </Collapse>
            </Grid>
          )}

          <Grid className={classes.navItem}>
            <ListItem
              selected={selectedIndex === 4}
              onClick={() => {
                handleListItemClick(4);
                setOpenCollapse({ PayRolls: !openCollapse.PayRolls });
              }}
              className={classes.navButton}
            >
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText primary="Payrolls" />
              {openCollapse.PayRolls ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse.PayRolls} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem2
                  component={Link}
                  to={`/salary/employeeSalary/${user.employeeID}`}
                  selected={selectedIndex2 === 0}
                  onClick={() => {
                    handleListItemClick2(0);
                  }}
                  className={classes.navButton2}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Salary Sheet" />
                </ListItem2>
                {user.jobRole === "HR Manager" && (
                  <ListItem2
                    component={Link}
                    to="/salary/currentSalary"
                    selected={selectedIndex2 === 1}
                    onClick={() => {
                      handleListItemClick2(1);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Current" />
                  </ListItem2>
                )}
                {user.jobRole === "HR Manager" && (
                  <ListItem2
                    component={Link}
                    to="/salary/summarySalary"
                    selected={selectedIndex2 === 2}
                    onClick={() => {
                      handleListItemClick2(2);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Summary" />
                  </ListItem2>
                )}
                {user.jobRole === "HR Manager" && (
                  <ListItem2
                    component={Link}
                    to={`/salary/salaryPercentages/${user.employeeID}`}
                    selected={selectedIndex2 === 3}
                    onClick={() => {
                      handleListItemClick2(3);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Rates" />
                  </ListItem2>
                )}
              </List>
            </Collapse>
          </Grid>

          {user.jobRole !== "IT Employee" && (<Grid className={classes.navItem}>
            <ListItem
              selected={selectedIndex === 5}
              onClick={() => {
                handleListItemClick(5);
                setOpenCollapse({ Promotion: !openCollapse.Promotion });
              }}
              className={classes.navButton}
            >
              <ListItemIcon>
                <HowToRegIcon />
              </ListItemIcon>
              <ListItemText primary="Promotion" />
              {openCollapse.Promotion ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse.Promotion} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {user.teamLead && (
                  <ListItem2
                    component={Link}
                    to="/promotion/Questions"
                    selected={selectedIndex2 === 0}
                    onClick={() => {
                      handleListItemClick2(0);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Question" />
                  </ListItem2>
                )}

                {(user.jobRole === "HR Manager" || user.teamLead) && (
                  <ListItem2
                    component={Link}
                    to="/promotion/Paper"
                    selected={selectedIndex2 === 1}
                    onClick={() => {
                      handleListItemClick2(1);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Paper" />
                  </ListItem2>
                )}

                {user.jobRole === "HR Manager" && (
                  <ListItem2
                    component={Link}
                    to={`/promotion/evaluation/exam/viewExam/${user.employeeID}`}
                    selected={selectedIndex2 === 2}
                    onClick={() => {
                      handleListItemClick2(2);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Exam" />
                  </ListItem2>
                )}
                {user.teamLead && (
                  <ListItem2
                    component={Link}
                    to={`/promotion/evaluation/allSubmissions/${user.employeeID}`}
                    selected={selectedIndex2 === 3}
                    onClick={() => {
                      handleListItemClick2(3);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Evaluation" />
                  </ListItem2>
                )}

                {(user.jobRole !== "CTO" || user.jobRole !== "IT Employee") && (
                  <ListItem2
                    component={Link}
                    to={`/promotion/evaluation/mySubmissions/${user.employeeID}`}
                    selected={selectedIndex2 === 4}
                    onClick={() => {
                      handleListItemClick2(4);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Evaluation Test" />
                  </ListItem2>
                )}

                {(user.jobRole === "CTO" || user.jobRole === "HR Manager") && (
                  <ListItem2
                    component={Link}
                    to={`/promotion/evaluation/allSubmissions`}
                    selected={selectedIndex2 === 5}
                    onClick={() => {
                      handleListItemClick2(5);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="All Submission" />
                  </ListItem2>
                )}

                {(user.jobRole === "HR Manager" || user.jobRole === "CTO") && (
                  <ListItem2
                    component={Link}
                    to={`/promotions`}
                    selected={selectedIndex2 === 6}
                    onClick={() => {
                      handleListItemClick2(6);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Promotions" />
                  </ListItem2>
                )}
              </List>
            </Collapse>
          </Grid>)}

          {(user.jobRole === "HR Manager" ||
            user.jobRole === "CTO" ||
            user.isTeamLead) && (
            <Grid className={classes.navItem}>
              <ListItem
                selected={selectedIndex === 6}
                onClick={() => {
                  handleListItemClick(6);
                  setOpenCollapse({ Recruitment: !openCollapse.Recruitment });
                }}
                className={classes.navButton}
              >
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Recruitment" />
                {openCollapse.Recruitment ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={openCollapse.Recruitment}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem2
                    component={Link}
                    to="/interview"
                    selected={selectedIndex2 === 0}
                    onClick={() => {
                      handleListItemClick2(0);
                    }}
                    className={classes.navButton2}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Interviews" />
                  </ListItem2>

                  {user.jobRole === "HR Manager" && (
                    <ListItem2
                      component={Link}
                      to="/candidate"
                      selected={selectedIndex2 === 1}
                      onClick={() => {
                        handleListItemClick2(1);
                      }}
                      className={classes.navButton2}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Candidates" />
                    </ListItem2>
                  )}
                </List>
              </Collapse>
            </Grid>
          )}
        </Scrollbars>

        <Divider variant="middle" classes={{ root: classes.divider }} />
        <Divider variant="middle" classes={{ root: classes.divider }} />

        <Grid>
          <IconButton onClick={handleLogOut} className={classes.logOutButton}>
            <LogoutIcon />
          </IconButton>
        </Grid>

        <Grid className={classes.sideBarFooter}>
          <Typography variant="body2" color={"white"}>
            DirectFN Ltd.
          </Typography>
          <Typography variant="caption" color={"white"}>
            [Direct Financial Network Company]
          </Typography>
          <Typography variant="subtitle2" color={"white"}>
            DirectFN (c) 2021
          </Typography>
        </Grid>
      </Drawer>
    </Box>
  );
};
export default SideBar;
