import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  title: {
    "& .MuiTypography-h5": {
      fontSize: theme.spacing(5),
      fontFamily: "Rubik",
      color: "white",
    },
  },
  step: {
    margin: theme.spacing(4, 0, 4, 4),
    "& .MuiTypography-h5": {
      fontFamily: "Rubik",
    },
  },
  card1: {
    background: "linear-gradient(45deg, rgb(255, 102, 153),	rgb(255, 204, 220))",
    // borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    "& .MuiTypography-h2": {
      color: "white",
      fontFamily: "Rubik",
      fontWeight: 100,
    },
    '&:hover': {
      background: "linear-gradient(45deg, rgb(255, 51, 153),	rgb(255, 128, 191))",
      transform: "scale3d(1.05, 1.05, 1)",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
      fontSize: theme.spacing(9),
      fontWeight: 200,
    },
    "& .MuiTypography-body1": {
      color: "white",
      fontSize: theme.spacing(3),
      fontFamily: "Kanit",
    },
  },
  card2: {
    background: "linear-gradient(45deg,rgb(255, 153, 0) ,rgb(255, 153, 102))",
    // borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    "& .MuiTypography-body1": {
      color: "white",
      fontSize: theme.spacing(3),
      fontFamily: "Kanit",
    },
    '&:hover': {
      background: "linear-gradient(45deg, rgb(255, 102, 0),	rgb(255, 255, 0))",
      transform: "scale3d(1.05, 1.05, 1)",
    },
    "& .MuiTypography-h2": {
      color: "white",
      fontFamily: "Rubik",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
      fontSize: theme.spacing(9),
      fontWeight: 200,
    },
  },
  card3: {
    background: "linear-gradient(45deg,rgb(0, 179, 0), rgb(179, 255, 236))",
    // borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    "& .MuiTypography-body1": {
      color: "white",
      fontSize: theme.spacing(3),
      fontFamily: "Kanit",
    },
    "& .MuiTypography-h2": {
      color: "white",
      fontFamily: "Rubik",
      fontWeight: 100,
    },
    "& .MuiSvgIcon-root": {
      color: "white",
      fontSize: theme.spacing(9),
      fontWeight: 200,
    },
    '&:hover': {
      background: "linear-gradient(45deg, rgb(0, 51, 0),	rgb(102, 255, 51))",
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  card4: {
    padding: 4,
    marginRight: 4,
  },
  cardEmp: {
    background: "linear-gradient(45deg,rgb(163, 163, 194),rgb(198, 216, 236))",
    // borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    "& .MuiTypography-h2": {
      color: "black",
      fontFamily: "Georgia, serif;",
      fontWeight: 100,
    },
    "& .MuiSvgIcon-root": {
      color: "white",
      fontSize: theme.spacing(9),
      fontWeight: 200,
    },
    "& .MuiTypography-body1": {
      color: "black",
      fontSize: theme.spacing(3),
      fontFamily: "Georgia, serif;",
    },
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    border: "3px solid white",
    marginRight: theme.spacing(4),
  },
  cardGuid: {
    
    background: "linear-gradient(45deg,rgb(255, 255, 179),rgb(198, 216, 236))",
    width: 900,
    height: 500,
    alignContent: "center",
    // marginRight:2,

    marginLeft: theme.spacing(1),

    // borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    '&:hover': {
      background: "rgb(148, 184, 184)",
      transform: "scale3d(1.05, 1.05, 1)",
    },
    "& .MuiTypography-h2": {
      color: "black",
      fontFamily: "Rubik",
      fontWeight: 100,
    },

    "& .MuiTypography-body1": {
      color: "black",
      fontSize: theme.spacing(5),
      fontFamily: "Georgia, serif;",
    },
  },

  hover:{
    background: "rgb(198, 216, 236))",
  },
  icon: {
    "& .MuiSvgIcon-root": {
      fontSize: theme.spacing(30),
      fontWeight: 200,
      // marginLeft: theme.spacing(35),
    },
  },

  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(10),
  },
  progressIcon: {
    margin: theme.spacing(0, 0, 5, 0),
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "raw",
    "& .MuiSvgIcon-root": {
      fontSize: theme.spacing(8),
      fontWeight: 200,
      // marginLeft: theme.spacing(35),
    },
  },
}));

export default useStyles;
