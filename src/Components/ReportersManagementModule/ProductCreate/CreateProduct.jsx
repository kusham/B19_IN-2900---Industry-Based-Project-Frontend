import React, { useState, useEffect } from "react";
import {
  Grid,
  Divider,
  FormLabel,
  TextField,
  Typography,
  Button,
  MenuItem,
  Box,
  Paper,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { createProduct } from "../../../Api/ReportersManagementModule/ProductApi";
import { getAllTeams } from "../../../Api/ReportersManagementModule/TeamsApi";
import { Link } from "react-router-dom";
import useStyles from "./ProductCreateStyles";
function CreateProduct() {
  const [duplicated, setDuplicated] = useState(false);
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [notAdded, setnotAdded] = useState(false);
  const [products, setProducts] = useState({
    productID: "",
    productName: "",
    description: "",
    nameofTeam: "",
  });
  const [teams, setTeams] = useState([]);
  const [productErrors, setProductErrors] = useState({
    productID: "",
    productName: "",
    description: "",
    nameofTeam: "",
  });
  //------------------------------
  const handleChange = (e) => {
    setProducts((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setProductErrors((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
  };

  const handleClear = () => {
    setProducts({
      productID: "",
      productName: "",
      description: "",
      teamNames: "",
    });
  };

  //-------------validation---------------------
  const errorHandle = () => {
    let isError = false;
    Object.keys(products).map((property) => {
      if (!products[property]) {
        setProductErrors((prevState) => ({
          ...prevState,
          [property]: property + "is required",
        }));
        isError = true;
      }
    });
    return isError;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errorHandle()) {
      const response = await createProduct(products);
      console.log(response);
      if (response.success === true) {
        setAddSuccessfully(true);
        setTimeout(() => {
          setAddSuccessfully(false);
        }, 2000);
        handleClear();
      }
      if (response.status === 400) {
        setDuplicated(true);
        setTimeout(() => {
          setDuplicated(false);
        }, 2000);
        handleClear();
      }
    } else {
      setnotAdded(true);
      setTimeout(() => {
        setnotAdded(false);
      }, 2000);
      handleClear();
    }
  };

  useEffect(() => {
    async function fetchData() {
      setTeams(await getAllTeams());
    }
    fetchData();
  }, []);
  const classes = useStyles();
  return (
    <div>
      <Box padding={1} sx={{ mt: 2, mb: 6 }}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Paper sx={{ padding: 5, backgroundColor: "#c7cad1" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#183d78" }}
            >
              <InventoryIcon /> Create Product
            </Typography>
            <Divider sx={{ mt: 5, mb: 5 }}></Divider>

            <Grid container sx={{ mb: 2 }} spacing={4}>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={3}>
                    <FormLabel sx={{ fontWeight: "bold" }}>
                      Product ID:
                    </FormLabel>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      name="productID"
                      value={products.productID}
                      onChange={handleChange}
                      error={productErrors.productID ? true : false}
                      helperText={productErrors.productID}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={6}>
                <Grid container>
                  <Grid item md={3}>
                    <FormLabel sx={{ fontWeight: "bold" }}>
                      Product Name:
                    </FormLabel>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      name="productName"
                      value={products.productName}
                      onChange={handleChange}
                      error={productErrors.productName ? true : false}
                      helperText={productErrors.productName}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={1.5}>
                <FormLabel sx={{ fontWeight: "bold" }}>Description:</FormLabel>
              </Grid>

              <Grid item md={10.5}>
                <TextField
                  rows={2}
                  id="filled-basic"
                  variant="filled"
                  multiline
                  label="Enter Description"
                  name="description"
                  value={products.description}
                  error={productErrors.description ? true : false}
                  helpertext={productErrors.description}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Grid item md={1.5}>
                <FormLabel sx={{ fontWeight: "bold" }}>Team Name:</FormLabel>
              </Grid>
              <Grid item md={4.5}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  name="nameofTeam"
                  select
                  value={products.nameofTeam}
                  onChange={handleChange}
                  error={productErrors.nameofTeam ? true : false}
                  helperText={productErrors.nameofTeam}
                  fullWidth
                >
                  {teams.map((team, i) => (
                    <MenuItem value={team} key={team.teamLeadID}>
                      <Typography>{team.teamName}</Typography>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} textAlign="left">
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  sx={{ mt: 2 }}
                  className={classes.button}
                >
                  View Products
                </Button>
              </Grid>
              <Grid item md={6} textAlign="right">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{ mt: 2 }}
                  className={classes.button}
                >
                  Create New Product
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
        {addSuccessfully ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Product has been successfully added!
            </Alert>
          </Stack>
        ) : null}
        {notAdded ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              Please enter all the details!
            </Alert>
          </Stack>
        ) : null}
        {duplicated ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              Product is duplicated!
            </Alert>
          </Stack>
        ) : null}
      </Box>
    </div>
  );
}

export default CreateProduct;
