import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Rubik",
    margin: theme.spacing(2, 0, 2, 2),
  },
  card1: {
    background: "linear-gradient(45deg, rgb(255, 102, 153),	rgb(255, 204, 220))",
    borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
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
    "& .MuiTypography-body1": {
      color: "white",
      fontSize: theme.spacing(4),
      fontFamily: "Kanit",
    },
    '&:hover': {
     
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  card2: {
    background: "linear-gradient(45deg, rgb(255, 102, 0),	rgb(255, 255, 0))",
    borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    "& .MuiTypography-body1": {
      color: "white",
      fontSize: theme.spacing(4),
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
      
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  card3: {
    background: "linear-gradient(45deg, rgb(0, 51, 0),	rgb(102, 255, 51))",
    borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    "& .MuiTypography-body1": {
      color: "white",
      fontSize: theme.spacing(4),
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
     
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  cardText: {
    //display: "flex",
    //flexDirection: "column",
    //alignItems: "flex-start",
    //justifyContent: "center",
    //fontFamily: "fantasy",
    //fontSize: "20",
    //color: "white",
  },
  cardIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
