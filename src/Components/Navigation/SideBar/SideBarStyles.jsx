import { styled } from "@mui/material/styles";
import { Badge, ListItemButton } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import MuiDrawer from "@mui/material/Drawer";


export const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "rgba(0, 15, 130, 0.5)",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "rgba(2, 8, 107, 1)",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "rgba(2, 8, 107, 1)",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    }
  },
  selected: {}
})(ListItemButton);

export const ListItem2 = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "rgba(31, 28, 245, 0.4)",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "rgba(2, 8, 107, 1)",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "rgba(2, 8, 107, 0.3)",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    }
  },
  selected: {}
})(ListItemButton);


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const drawerWidth = 260;
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const useStyles = makeStyles((theme) => ({
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0, 0, 2, 2),
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  profileName: {
    marginLeft: theme.spacing(2),
  },
  icon: (props) => ({
    position: "absolute",
    top: "3%",
    right: "3px",
    display: props.display,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgb(255, 255, 239, 0.5)",
    cursor: "pointer",
  }),
  paper: {
    backgroundColor: "rgb(0, 0, 0)",
  },
  navItem: {
    margin: theme.spacing(2, 2, 0, 1),
  },
  navButton: (props)=> ({
    backgroundColor: "rgb(255, 255, 255, 0.1)",
    color: "rgb(255, 255, 255, 0.8)",
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(props.iconPadding),
    borderRadius: theme.spacing(2),
    "& .MuiSvgIcon-root" : {
      color: "rgb(255, 255, 255)" 
    }
  }),
  navButton2: {
    backgroundColor: "rgb(255, 255, 255, 0.1)",
    color: "rgb(255, 255, 255, 0.8)",
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(0.5, 0, 0.5, 4),
    borderRadius: theme.spacing(2),
    "& .MuiSvgIcon-root" : {
      color: "rgb(255, 255, 255)" 
    }
  },
  navText: (props) => ({
    display: props.display,
    alignItems: "center",
    margin: theme.spacing(0.2, 0, 0, 1),
    color: "rgb(255, 255, 255, 0.8)",
  }),
  divider: {
    background: "gray",
  },
  iconRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255, 255, 255, 0.4)",
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1),
    padding: theme.spacing(1, 2),
  },
  iconRowIcon: {
    backgroundColor: "rgb(255, 255, 255, 0.6)",
    borderRadius: theme.spacing(10),
    height: "30px",
    width: "30px",
    margin: theme.spacing(0, 0.3),
  },
  sideBarFooter: (props) => ({
    display: props.display,
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 3, 0.7, 2),
    backgroundColor: "rgb(255, 255, 255, 0.1)",
  }),
  logOutButton: (props) => ({
    display: props.displayLogOut,
    backgroundColor: "rgb(255, 255, 255, 0.4)",
    "&:hover": {
      backgroundColor: "rgb(255, 255, 255, 0.2)",
    },
    margin: theme.spacing(4, 1.5, 3, 1.5),
  }),
}));


