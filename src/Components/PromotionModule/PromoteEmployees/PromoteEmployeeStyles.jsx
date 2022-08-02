import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(2),
        "& .MuiTypography-h5": {
          fontFamily: "Rubik",
          marginBottom: theme.spacing(2),
        },
      },
      jobCard : {
        padding: theme.spacing(1.3),
        "& .MuiTypography-h6": {
            fontWeight: 400,
            fontSize: theme.spacing(2),
          },
        background:
        "linear-gradient(-45deg, rgb(255, 255, 128),  rgba(255, 255, 255, 0.8))",
      },
      jobContainer: {
        display: "flex",
        justifyContent: "center",
      },
      head: {
        padding: theme.spacing(2),
        background:"rgba(0, 0, 0, 0.9)"
        
      
      },
      headContent: {
        display: "flex",
        justifyContent: "center",
        "& .MuiTypography-h6": {
            fontSize: theme.spacing(2.2),
            fontFamily: "Rubik",
            color: "white"
          },
      },
      cellContent : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiTypography-h6": {
            fontSize: theme.spacing(2),
            fontFamily: "Rubik",
          },
      },
      row: {
        padding: theme.spacing(2),
        background:"rgba(192, 192, 187, 0.4)"
      },
      notAvailable: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiTypography-h6": {
          fontSize: theme.spacing(2),
          fontFamily: "Rubik",
        },
      }
      
}));


