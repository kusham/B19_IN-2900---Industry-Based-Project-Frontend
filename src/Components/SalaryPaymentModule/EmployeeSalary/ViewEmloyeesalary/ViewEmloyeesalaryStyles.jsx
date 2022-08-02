import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  Box: {
    width: "100%",
    height: "100%",
    backgroundColor: "#d7dde0",
    padding: 6,
    paddingBottom: "8%",
  },

  card: { padding: "20px", backgroundColor: "#e0f2f1" },

  topic: {
    fontSize: "30px",
    color: "#6d4c41",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },

  name: { fontWeight: "bold", color: "#455a64" },

  namevalue: { fontWeight: 400, color: "#455a64" },

  net: {
    fontWeight: "bold",
    color: "#263238",
  },

  netVal: {
    fontWeight: "bold",
    color: "#f4511e",
  },

  middle: {
    fontWeight: "medium",
    fontSize: "12px",
    color: "#80cbc4",
    alignContent: "center",
  },

  button: {
    align: "center",
    marginLeft: 2,
    backgroundColor: "#00695c",
    color: "#e0f2f1",
    "&:hover": {
      color: "#d7dde0",
      backgroundColor: "#757575",
    },
  },
}));

export default useStyles;
