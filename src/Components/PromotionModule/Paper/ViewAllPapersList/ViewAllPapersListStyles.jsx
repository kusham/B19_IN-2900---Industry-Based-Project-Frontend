import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    boxShadow: "1px 1px #9da1a6",
    "&:hover": {
      backgroundColor: "#eceff1",
    },
    backgroundColor: "#e3f2fd",
  },
  pos: {
    justifyContent: "center",
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    shadow: "red",
  },
  button_eval: {
    justifyContent: "left",
  },
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    padding: 3,
    paddingBottom: "50px",
  },
  topic: {
    fontSize: "30px",
    fontWeight: "Bold",
    color: "#183d78",
    marginBottom: 12,
    marginTop: 12,
    textAlign: "center",
  },
  name: {
    fontWeight: "bold",
    color: "#546e7a",
  },
});
export default useStyles;
