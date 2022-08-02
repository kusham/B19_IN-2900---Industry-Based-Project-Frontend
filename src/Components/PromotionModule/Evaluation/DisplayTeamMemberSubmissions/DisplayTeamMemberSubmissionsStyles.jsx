import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    height: "100%",
  },
  topic: {
    fontSize: "30px",
    color: "#183d78",
    marginLeft: "25%",
    fontWeight: "bold",
    paddingTop: "3%",
  },
  table: {
    minWidth: 700,
    paddingLeft: 50,
  },
  paper: {
    marginLeft: 30,
    marginRight: 30,
    width: "auto",
    backgroundColor: "#d7dde0",
    marginBottom: "11%",
  },
  content: {
    fontSize: "20px",
    color: "#183d78",
    fontWeight: "medium",
  },
  text: {
    marginLeft: "28%",
  },
  content2: {
    fontSize: "20px",
    color: "#183d78",
    fontWeight: "medium",
    marginLeft: "35%",
  },
}));

export default useStyles;
