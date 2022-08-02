import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    boxShadow: "1px 1px #9da1a6",
    width: "100%",
    backgroundColor: "#E0E0E0",
  },
  text: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#000a12",
    marginTop: 10,
    marginLeft: 15,
  },
  // pos: {
  //   marginBottom: 12,
  //   justifyContent: "center",
  // },
  gridContainer: {
    paddingLeft: "20%",
    paddingRight: "40px",
    width: "75%",
    justifyContent: "center",
  },
  card1: {
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 2,
    width: "85%",
    padding: 2,
    backgroundColor: "#E0E0E0",
    "&:hover": {
      backgroundColor: "#D7CCC8",
    },
  },

  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    //marginTop: 10,
    paddingBottom: "50px",
  },

  formControl: { paddingTop: "10", marginLeft: 100 },

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

  textarea: {
    width: "90%",
    marginLeft: 25,
    marginBottom: 10,
    marginTop: 2,
    marginRight: 2,
    borderWidth: "0",
    backgroundColor: "#E0E0E0",
    "&:hover": {
      backgroundColor: "#D7CCC8",
      borderWidth: "0",
    },
  },
  backButton: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 15,
    paddingRight: 25,
  },
});
export default useStyles;
