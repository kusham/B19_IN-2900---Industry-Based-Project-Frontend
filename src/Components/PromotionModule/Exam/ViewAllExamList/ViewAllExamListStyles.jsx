import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    padding: 6,
  },
  topic: {
    fontSize: "30px",
    color: "#00BCD4",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  search: {
    marginLeft: 50,
    color: "d7dde0",
    padding: 5,
    border: "2px solid #3f51b5",
    borderRadius: 5,
    backgroundColor: "#d7dde0",
  },
  table: {
    minWidth: 700,
    paddingLeft: 50,
  },
  Button: {
    backgroundColor: "#FF3D00",
    color: "#e0f2f1",
    "&:hover": {
      color: "#d7dde0",
      backgroundColor: "#2f375e",
    },
  },
}));

export default useStyles;
