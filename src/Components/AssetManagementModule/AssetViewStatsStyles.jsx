import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

    box:{
        margin: theme.spacing(4)
    },
  title: {
    fontFamily: "Rubik",
    margin: theme.spacing(0, 0, 2, 2),
  },
  card1: {
    background:
      "linear-gradient(45deg, rgba(39, 200, 245, 0.8), rgba(7, 57, 172, 0.8))",
    borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    
    "& .MuiTypography-h2" : {
      color: "white",
      fontFamily: "Rubik",
      fontWeight: 100
    },
    "& .MuiSvgIcon-root" : {
      color: "white",
      fontSize: theme.spacing(8),
      fontWeight: 200
    },
    "& .MuiTypography-body1" : {
      color: "white",
      fontFamily: 'Kanit'
    }
  },
  card2: {
    background:
      "linear-gradient(45deg,rgba(248, 122, 2, 0.8) 20%, rgba(233, 10, 165, 0.8))",
    borderRadius: theme.spacing(4),
    padding: theme.spacing(2),
    
    "& .MuiTypography-h2" : {
      color: "white",
      fontFamily: "Rubik",
      fontWeight: 100
    },
    "& .MuiSvgIcon-root" : {
      color: "white",
      fontSize: theme.spacing(8),
      fontWeight: 200
    },
    "& .MuiTypography-body1" : {
      color: "white",
      fontFamily: 'Kanit'
    }
  },
  card3: {
    background:
      "linear-gradient(-45deg, rgba(5, 240, 145, 0.8), rgba(4, 131, 87, 1))",
      borderRadius: theme.spacing(4),
      padding: theme.spacing(2),
    
      "& .MuiTypography-h2" : {
        color: "white",
        fontFamily: "Rubik",
        fontWeight: 100
      },
      "& .MuiSvgIcon-root" : {
        color: "white",
        fontSize: theme.spacing(9),
        fontWeight: 200
      },
      "& .MuiTypography-body1" : {
        color: "white",
        fontFamily: 'Kanit'
      }
  },
  cardIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardText : {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  }
}));

export default useStyles;
