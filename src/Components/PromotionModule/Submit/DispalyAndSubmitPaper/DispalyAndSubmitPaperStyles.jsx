import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    boxShadow: "1px 1px #9da1a6",
    width: "100%",
    backgroundColor: "#eceff1",
  },
  text: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#000a12",
    marginTop: 15,
    marginLeft: 15,
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
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 2,
    width: "85%",
    padding: 2,
    backgroundColor: "#e0e0e0",
    "&:hover": {
      backgroundColor: "#e8eaf6",
    },
  },
  dialogBoxTopic: {
    justifyContent: "center",
    paddingLeft: "85px",
    color: "red",
  },
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    marginTop: 10,
    paddingBottom: "50px",
  },

  formControl: { paddingTop: 10, marginLeft: 100 },

  head: {
    fontSize: 35,
    fontWeight: "Bold",
    color: "#183d78",
    paddingBottom: "20px",
  },
  name: {
    fontWeight: "bold",
    color: "#546e7a",
    marginLeft: "20px",
  },
  submitButton: {
    justifyContent: "center",
    display: "flex",
    paddingBottom: "15px",
  },
  nohead: {
    fontSize: 35,
    fontWeight: "Bold",
    color: "#183d78",
    mb: 2,
    marginLeft: 40,
    marginTop: 65,
  },
  btn: {
    justifyContent: "center",
    display: "flex",
    marginLeft: "20px",
  },
});
export default useStyles;
