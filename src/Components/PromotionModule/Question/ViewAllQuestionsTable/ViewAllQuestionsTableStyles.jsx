import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    padding: 6,
  },
  topic: {
    fontSize: "30px",
    color: "#183d78",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    paddingTop: "3%",
  },
  search: {
    marginLeft: 50,
    color: "d7dde0",
    padding: 5,
    border: "2px solid #3f51b5",
    borderColor: "#2f375e",
    borderRadius: 5,
    backgroundColor: "#d7dde0",
  },
  table: {
    width: "100%",
    paddingLeft: 50,
  },
  paper: {
    width: "70%",
    spacing: 0,
    direction: "column",
    alignItems: "center",
    marginLeft: "15%",
  },
  btn: {
    align: "center",
    marginLeft: 2,
    backgroundColor: "#183d78",
    color: "#e0f2f1",
    "&:hover": {
      color: "#183d78",
      backgroundColor: "#b0bec5",
    },
  },
}));

export default useStyles;
