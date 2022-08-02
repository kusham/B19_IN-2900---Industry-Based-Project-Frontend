import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    mt: 2,
    backgroundColor: "#183d78",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4d5575",
      color: "#fff",
    },
  },
}));
export default useStyles;
