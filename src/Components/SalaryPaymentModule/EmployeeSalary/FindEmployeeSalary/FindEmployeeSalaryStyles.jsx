import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  Box: {
    width: "100%",
    height: "auto",
    backgroundColor: "#d7dde0",
    padding: 3,
  },
  topic: {
    fontSize: "30px",
    color: "#6d4c41",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
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
  search: {
    marginLeft: 50,
    color: "#c2185b",
    backgroundColor: "#d7dde0",
    padding: 5,
    border: "2px solid",
    borderRadius: 5,
    borderColor: "#3e2723",
  },
}));

export default useStyles;
