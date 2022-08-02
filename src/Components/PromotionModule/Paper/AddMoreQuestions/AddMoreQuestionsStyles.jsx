import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  Box: {
    width: "100%",
    backgroundColor: "#d7dde0",
    padding: 3,
    marginTop: false,
  },
  form: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
    backgroundColor: "#eceff1",
  },
  formGrid: {
    paddingLeft: "20%",
    paddingRight: "40px",
    shadow: "red",
    width: "75%",
    justifyContent: "center",
  },

  texFieldLabel: {
    display: "flex",
    marginLeft: 15,
    alignItems: "center",
    "& .MuiFormLabel-root": {
      fontWeight: 600,
      fontSize: 19,
    },
  },

  card2: {
    marginLeft: 25,
    marginBottom: 10,
    width: "85%",
    padding: 2,
    backgroundColor: "#e0e0e0",
    "&:hover": {
      backgroundColor: "#e8eaf6",
    },
    //
    minheight: "30vw",
  },

  checkbox: {
    display: "flex",
    justifyContent: "flex-end",
  },
  createButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 5, 1),
  },
  viewButton: {
    display: "flex",
    marginTop: "3%",
  },
  name: {
    fontWeight: "bold",
    color: "#546e7a",
  },
  text: {
    margin: "20px",
    marginBottom: false,
  },
  textq: {
    margin: "1px",
    marginBottom: false,
  },
  gridq: {
    marginLeft: "30px",
    marginTop: false,
    backgroundColor: "#eceff1",
    elevation: false,
  },
  topic: {
    justifyContent: "center",
    paddingLeft: "20px",
    fontWeight: "Bold",
    color: "#183d78",
  },
  head2: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#546e7a",
    margin: "5px",
    paddingLeft: 5,
    paddingTop: 5,
  },
  selectedQGrid: {
    paddingTop: 1,
    paddingLeft: 40,
    width: "95%",
  },
  none: {
    fontWeight: "small",
    fontSize: "12px",
    color: "#546e7a",
  },
}));

export default useStyles;
