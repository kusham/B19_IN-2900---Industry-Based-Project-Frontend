import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    padding: 4,
    minHeight:'100vh'
  },
  topic: {
    fontSize: "30px",
    color: "#0288d1",
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
}));

export default useStyles;

