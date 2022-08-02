// import { React, useState, useEffect } from "react";
// import { Grid, Card, Typography } from "@mui/material";
// import DisplayProduct from "./DisplayProduct";
// import { viewProducts } from "../../../Api/ReportersManagementModule/ProductApi";

// function DisplayProducts() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       setProducts(await viewProducts());
//     }
//     fetchData();
//   }, []);

//   return (
//     <div component="div">
//       <Grid container>
//         <Grid item md={1}></Grid>
//         <Grid item md={11}>
//           <Card
//             sx={{
//               mb: 2,
//               minWidth: 1110,
//               padding: 3,
//               backgroundColor: "lightblue",
//               fontWeight: "bold",
//             }}
//           >
//             <Grid container>
//               <Grid item md={3}>
//                 <Typography> Product ID </Typography>
//               </Grid>
//               <Grid item md={3}>
//                 <Typography> Product Name</Typography>
//               </Grid>
//               <Grid item md={3}>
//                 <Typography> Description</Typography>
//               </Grid>
//               <Grid item md={3}>
//                 <Typography> Team NAme</Typography>
//               </Grid>
//             </Grid>
//           </Card>
//         </Grid>
//       </Grid>

//       <Grid>
//         {products &&
//           products.map((tm, i) => {
//             return (
//               <Grid item xs={12} sm={6} md={4} component="div" key={i}>
//                 <DisplayProduct product={tm} />
//               </Grid>
//             );
//           })}
//       </Grid>
//     </div>
//   );
// }

// export default DisplayProducts;
