import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  Divider,
  FormLabel,
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { updateProduct } from "../../../Api/ReportersManagementModule/ProductApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { add } from "date-fns";
function EditProduct() {
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [notAdded, setnotAdded] = useState(false);
  const [duplicated, setDuplicated] = useState(false);
  const [noChangeField, setNoChangeField] = useState(false);
  const [updateField, setUpdateField] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    productID: "",
    productName: "",
    description: "",
  });

  const location = useLocation();
  const { product } = location.state;

  const [products, setProducts] = useState({
    // _id: product._id,
    productID: product.productID,
    productName: product.productName,
    description: product.description,
    teamName: product.teamName,
  });

  const handleChange = (e) => {
    setProducts((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setUpdateField(true);
    setInputErrors({ ...inputErrors, [e.target.name]: "" });
  };

  const errorHandle = () => {
    let isError = false;

    if (!products.productName) {
      setInputErrors((prevState) => ({
        ...prevState,
        productName: "Product Name is required",
      }));
      isError = true;
    }
    if (!products.productID) {
      setInputErrors((prevState) => ({
        ...prevState,
        productID: "Product ID is required",
      }));
      isError = true;
    }
    if (!products.description) {
      setInputErrors((prevState) => ({
        ...prevState,
        description: "Description is required",
      }));
      isError = true;
    }

    return isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errorHandle()) {
      const response = await updateProduct(products, product._id);
      if (response.success === true && updateField) {
        setAddSuccessfully(true);
        setTimeout(() => {
          setAddSuccessfully(false);
        }, 2000);
      }
      if (response.status === 400) {
        setDuplicated(true);
        setTimeout(() => {
          setDuplicated(false);
        }, 2000);
      }
      if (!updateField) {
        setNoChangeField(true);
        setTimeout(() => {
          setNoChangeField(false);
        }, 2000);
      }
    } else {
      setnotAdded(true);
      setTimeout(() => {
        setnotAdded(false);
      }, 2000);
    }
  };

  return (
    <div>
      <Box padding={4} sx={{ mb: 6 }}>
        {products && (
          <form>
            <Box>
              <Card sx={{ padding: 8, backgroundColor: "#e4ecf7" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#183d78" }}
                >
                  <InventoryIcon />
                  &nbsp;{products.productName} | {products.productID}
                </Typography>
                <Divider sx={{ mt: 5, mb: 5 }}></Divider>
                <Grid container>
                  <Grid item md={6}>
                    <Grid container sx={{ mb: 5 }}>
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
                          onChange={handleChange || add(this)}
                          error={inputErrors.productID ? true : false}
                          helperText={inputErrors.productID}
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
                          error={inputErrors.productName ? true : false}
                          helperText={inputErrors.productName}
                          onChange={handleChange || add(this)}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item md={1.5}>
                    <FormLabel sx={{ fontWeight: "bold" }}>
                      Description:
                    </FormLabel>
                  </Grid>
                  <Grid item md={10.5}>
                    <TextField
                      rows={7}
                      id="filled-basic"
                      variant="filled"
                      multiline
                      label="Enter Description"
                      name="description"
                      value={products.description}
                      error={inputErrors.description ? true : false}
                      helpertext={inputErrors.description}
                      onChange={handleChange || add(this)}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 5, mt: 2 }}>
                  <Grid item md={1.5}>
                    <FormLabel sx={{ fontWeight: "bold" }}>
                      Team Name:
                    </FormLabel>
                  </Grid>

                  <Grid item md={4.5}>
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      disabled
                      value={products.teamName}
                      fullWidth
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={6} textAlign="left">
                    <Button
                      component={Link}
                      to="/products"
                      variant="contained"
                      sx={{
                        mt: 2,
                        backgroundColor: "#183d78",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#4d5575",
                          color: "#fff",
                        },
                      }}
                    >
                      View Products
                    </Button>
                  </Grid>
                  <Grid item md={6} textAlign="right" sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        backgroundColor: "#183d78",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#4d5575",
                          color: "#fff",
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Card>
              {addSuccessfully ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Product updated successfully!
                  </Alert>
                </Stack>
              ) : null}
              {notAdded ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    Please enter all details!
                  </Alert>
                </Stack>
              ) : null}
              {duplicated ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    Details are duplicated,Product is not updated!
                  </Alert>
                </Stack>
              ) : null}
              {noChangeField ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="warning">
                    No any change to update!
                  </Alert>
                </Stack>
              ) : null}
            </Box>
          </form>
        )}
      </Box>
    </div>
  );
}

export default EditProduct;
