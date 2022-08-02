import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    boxShadow: "1px 1px #9da1a6",
    width: "100%",
    backgroundColor: "#eceff1",
    marginBottom: "10%",
  },
  text: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#000a12",
    marginTop: 5,
  },
  pos: {
    marginBottom: 12,
    justifyContent: "center",
  },
  gridContainer: {
    paddingLeft: "20%",
    paddingRight: "40px",
    shadow: "red",
    width: "75%",
    justifyContent: "center",
  },
  card1: {
    marginLeft: 25,
    marginBottom: 10,
    marginTop: 10,
    width: "85%",
    padding: 2,
    backgroundColor: "#e0e0e0",
    "&:hover": {
      backgroundColor: "#e8eaf6",
    },
  },
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    padding: 3,
    marginTop: false,
  },
  name: {
    fontWeight: "bold",
    color: "#546e7a",
    marginLeft: "20px",
  },
  topic: {
    m1: 2,
    fontWeight: "Bold",
    color: "#183d78",
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 25,
  },
  btn: {
    marginRight: 5,
  },
});
export default useStyles;
