import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Rubik",
    margin: theme.spacing(2, 0, 2, 6),
  },
  paper: {
    borderRadius: theme.spacing(4),
   
    backgroundColor:"#ede7f6",
    padding: theme.spacing(1, 2, 2, 4),
    margin: theme.spacing(2, 2, 10, 4),
    "& .MuiSvgIcon-root": {
      color: "#4a148c",
      fontSize: theme.spacing(5),
      fontWeight: 200,
      margin: theme.spacing(1, 1, 1, 2),
    },
    // '&:hover': {
    //   background: "linear-gradient(45deg,rgb(224, 235, 235),rgb(255, 255, 230))",
    //   transform: "scale3d(1.05, 1.05, 1)",
    // },
  },
  image: {
    width: 120,
    height: 120,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    border: "3px solid white",

    /*"&.MuiAvatar-root":{
            alignItems: "center",
            margin: (10,4,4,4),
        }*/ 
  },
  teamLeadTitle: {
    display: "flex",
    "&.MuiTypography-body1": {
      //fontFamily: "Rubik",
      //alignItems:"center",
      fontSize: "30",
    },
  },
  detail: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
