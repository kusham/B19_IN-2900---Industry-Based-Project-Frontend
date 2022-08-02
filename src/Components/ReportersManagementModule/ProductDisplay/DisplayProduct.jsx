// import React from "react";
// import { Typography, Grid, Card } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { IconButton } from "@mui/material";
// import { Link } from "react-router-dom";
// import { Scrollbars } from "react-custom-scrollbars";
// import { Box } from "@mui/system";

// function ReadMore({ children, maxChatacterCount = 100 }) {
//   const text = children;
//   const resultString = text.slice(0, 100);

//   return <Typography>{resultString}</Typography>;
// }
// function DisplayProduct({ product }) {
//   const { _id, productID, productName, description, teamID, teamName } =
//     product;

//   console.log(product);
//   return (
//     <div>
     








//       <Grid container>
//         <Grid item md={3}>
//           <IconButton
//             sx={{ backgroundColor: "lightblue" }}
//             component={Link}
//             to={`/products/update/${_id}`}
//             state={{ product }}
//           >
//             <EditIcon sx={{ color: "gray" }} fontSize="large" />
//           </IconButton>
//         </Grid>
//         <Grid item md={9} sx={{ mb: 1 }}>
//           <Scrollbars style={{ height: 70, width: 1110 }}>
//             <Box>
//               <Card
//                 sx={{
//                   minWidth: 1110,
//                   backgroundColor: "lightgray",
//                   padding: 3,
//                 }}
//               >
//                 <Grid container>
//                   <Grid item md={3}>
//                     <Typography>{productID}</Typography>
//                   </Grid>
//                   <Grid item md={3}>
//                     <Typography>{productName}</Typography>
//                   </Grid>
//                   <Grid item md={3}>
//                     <Typography
//                       sx={{
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         display: "webkit-box",
                      
                        
//                       }}
//                     >
//                       {description}
//                     </Typography>
//                   </Grid>
//                   <Grid item md={3}>
//                     <Typography>{teamName}</Typography>
//                   </Grid>
//                 </Grid>
//               </Card>
//             </Box>
//           </Scrollbars>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default DisplayProduct;
