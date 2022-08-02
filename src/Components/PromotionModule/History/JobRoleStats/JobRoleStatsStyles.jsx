import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),
    "& .MuiTypography-h5": {
      fontFamily: "Rubik",
      margin: theme.spacing(0, 0, 0.6, 2),
    },
  },
  card1: {
    background:
      "linear-gradient(45deg, rgba(39, 200, 245, 0.8), rgba(7, 57, 172, 0.8))",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    "& .MuiTypography-h6" : {
      fontSize: theme.spacing(2.6),
      fontWeight: 700
    },
    "& .MuiTypography-h5" : {
      fontSize: theme.spacing(3.5),
    },
    "& .MuiTypography-h2" : {
      fontSize: theme.spacing(9),
      fontWeight: 650
    }
  },
  icon1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      fontSize: theme.spacing(15),
    },
  },

  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  card2: {
    background:
    "linear-gradient(45deg,rgba(248, 122, 2, 0.8) 20%, rgba(233, 10, 165, 0.8))",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    "& .MuiTypography-h6" : {
      fontSize: theme.spacing(2.3),
      fontWeight: 700
    },
    "& .MuiTypography-h5" : {
      fontSize: theme.spacing(3),
    },
    "& .MuiTypography-h2" : {
      fontSize: theme.spacing(7),
      fontWeight: 650
    },
    
  },
  icon2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop : theme.spacing(2),
    "& .MuiSvgIcon-root": {
      fontSize: theme.spacing(6),
    },
  },
}));
