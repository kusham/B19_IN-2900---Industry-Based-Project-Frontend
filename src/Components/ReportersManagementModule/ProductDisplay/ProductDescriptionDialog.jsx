import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

function ProductDescriptionDialog({ openDialog, handleCloseDialog, product }) {
  return (
    <Dialog sx={{}} open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          {/* <Grid sm={10} md={10} item> */}
          <Typography
            variant="h5"
            sx={{ color: "#183d78", fontWeight: "bold" }}
          >
            Product Description
          </Typography>
        </Grid>
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <Grid>
          <Typography>{product && product.description}</Typography>
        </Grid>

        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{ mt: 2, backgroundColor: "#183d78", borderRadius: 20 }}
          >
            cancel
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDescriptionDialog;
