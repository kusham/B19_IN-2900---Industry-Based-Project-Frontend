import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
  header: {
    "& .MuiTypography-h5": {
      fontFamily: "Rubik",
      margin: theme.spacing(0, 0, 0, 2),
    },
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
