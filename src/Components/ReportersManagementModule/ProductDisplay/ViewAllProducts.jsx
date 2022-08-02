import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Grid,
  MenuItem,
  Menu,
  TableContainer,
} from "@mui/material";
import useStyles from "./ViewAllProductsStyles";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { viewProducts } from "../../../Api/ReportersManagementModule/ProductApi";
import { MoreVert } from "@mui/icons-material";
import ProductDescriptionDialog from "./ProductDescriptionDialog";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

//----------------------------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e0e0e0",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#e1f5fe",
  },
  "&:hover": {
    backgroundColor: "#fafafa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
//----------------------------------------
function ViewAllProducts() {
  const jobRole = JSON.parse(sessionStorage.getItem("user")).jobRole;
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setProducts(await viewProducts());
    }
    fetchData();

    handleCloseDialog();
  }, []);
  //------------------------
  useEffect(() => {
    setRows(
      products.filter(
        (record) =>
          record.productID.toLowerCase().includes(search.toLowerCase()) ||
          record.productName.toLowerCase().includes(search.toLowerCase()) ||
          record.teamName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);
  //--------------------------
  const handleOpenMenu = (event, product) => {
    setSelectedProduct(product);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  return (
    <div>
      <Paper sx={{ padding: 2, backgroundColor: "#183d78" }}>
        <Grid container>
          <Grid item md={7}>
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Product List of DirectFN PVT(LTD)
            </Typography>
          </Grid>
          <Grid item md={5} sx={{ textAlign: "right" }}>
            <input
              style={{
                color: "d7dde0",
                padding: 5,
                border: "2px solid #3f51b5",
                borderRadius: 5,
                backgroundColor: "#d7dde0",
              }}
              type="text"
              placeholder="Search...."
              onChange={(e) => setSearch(e.target.value)}
            />
            <Grid>
              <Typography
                textAlign="right"
                sx={{
                  fontSize: 13,
                  color: "#b5b6ba",
                  fontStyle: "italic",
                  mt: 1,
                }}
              >
                Search by Product ID, Product Name, Team Name
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left"> </StyledTableCell>
              <StyledTableCell align="left">Product ID</StyledTableCell>
              <StyledTableCell align="left">Product Name</StyledTableCell>
              <StyledTableCell align="left">Team</StyledTableCell>
              <StyledTableCell align="left"> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((product) => (
                <StyledTableRow key={product._id} className={classes.tableRow}>
                  <StyledTableCell>
                    <Grid item md={3}>
                     {jobRole === "HR Manager" &&( <IconButton
                        sx={{ backgroundColor: "#183d78" }}
                        component={Link}
                        to={`/products/update/${products._id}`}
                        state={{ product }}
                      >
                        <EditIcon sx={{ color: "white" }} fontSize="large" />
                      </IconButton>)}
                    </Grid>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>{product.productID}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>{product.productName}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>{product.teamName}</Typography>
                  </StyledTableCell>

                  <StyledTableCell>
                    <IconButton
                      onClick={(event) => {
                        handleOpenMenu(event, product);
                      }}
                      aria-controls={openMenu ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                    >
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleClose}
                      onClick={handleClose}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 1px 9px rgba(0,0,0,0.1))",
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => handleViewDetails(selectedProduct)}
                      >
                        View more
                      </MenuItem>

                      <MenuItem>Cancel</MenuItem>
                    </Menu>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>

        <ProductDescriptionDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          product={selectedProduct}
        />
      </TableContainer>
    </div>
  );
}

export default ViewAllProducts;
