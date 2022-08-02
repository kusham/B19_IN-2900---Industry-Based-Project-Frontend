import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { Link as Links } from "@mui/material";
import Paper from "@mui/material/Paper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import useStyles from "./NavBarStyles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ArrowDropDown, Home, Logout } from "@mui/icons-material";
import { Avatar, Grid, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
const NavBar = ({ open, toggleDrawer, user, handleLogOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  let paths = location.pathname.split("/");
  paths.shift();
  const currentPath = paths.pop();
  const classes = useStyles();
  
  return (
    <>
      <Paper elevation={0} variant="outlined" square className={classes.root} sx={{backgroundColor:"#E0E0E0"}}>
        <Grid container>
          <Grid item md={11} className={classes.breadcrumb}>
            <Breadcrumbs aria-label="breadcrumb">
              <IconButton className={classes.arrowIcon} onClick={toggleDrawer}>
                {open ? <Home /> : <ChevronRightIcon />}
              </IconButton>
              {paths.map((path) => (
                <Link
                  key={path}
                  className={classes.breadcrumbLink}
                  to={`/${path}`}
                >
                  {path}
                </Link>
              ))}
              <Typography color="text.primary">{currentPath}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item md={1} className={classes.avatar}>
            <IconButton
              onClick={handleOpenMenu}
              aria-controls={openMenu ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
            >
              <Avatar src={user.profilePic} />
              <ArrowDropDown fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
              <Links href="/user" sx={{ textDecoration: "none" }}>
                <MenuItem sx={{ color: "black" }}>
                  <ListItemIcon>
                    <Avatar src={user.profilePic} sizes="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
              </Links>

              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default NavBar;
