import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    padding: 6,
  },
  topic: {
    fontSize: "30px",
    color: "#0097a7",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15,
  },
  table: {
    minWidth: 700,
  },
  paper: {
    width: "60%",
    position: "relative",
    marginLeft: "20%",
    marginBottom: "5%",
  },
  btngrid: {
    marginLeft: "20%",
    marginBottom: "1%",
    width: "60%",
    display: "flex",
    justifyContent: "flex-end",
  },

  button: {
    align: "center",
    marginLeft: 2,
    backgroundColor: "#00acc1",
    color: "#fafafa",
    "&:hover": {
      color: "#fafafa",
      backgroundColor: "#00838f",
    },
  },
}));

export default useStyles;
