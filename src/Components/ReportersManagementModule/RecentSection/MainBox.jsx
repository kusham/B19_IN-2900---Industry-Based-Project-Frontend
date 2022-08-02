import React from "react";
import { keyframes } from "@emotion/react";
import { Card, Typography } from "@mui/material";

import Carousel, { autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const kenburnsTopLeft = keyframes` 0% {
    -webkit-transform: scale(1) translate(0, 0);
            transform: scale(1) translate(0, 0);
    -webkit-transform-origin: 16% 16%;
            transform-origin: 16% 16%;
  }
  100% {
    -webkit-transform: scale(1.25) translate(-20px, -15px);
            transform: scale(1.25) translate(-20px, -15px);
    -webkit-transform-origin: top left;
            transform-origin: top left;
  }
}
@keyframes kenburns-top-left {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
            transform: scale(1) translate(0, 0);
    -webkit-transform-origin: 16% 16%;
            transform-origin: 16% 16%;
  }
  100% {
    -webkit-transform: scale(1.25) translate(-20px, -15px);
            transform: scale(1.25) translate(-20px, -15px);
    -webkit-transform-origin: top left;
            transform-origin: top left;
  }`;

//const topics = ["VISSION", "MISSION", "AIMS"];
function MainBox() {
  return (
    <Card
      sx={{
        width: 620,
        height: 388,
        animation: `${kenburnsTopLeft} 1s ease-out both`,
        padding: 5,
        mt: 3.5,
        backgroundImage: `linear-gradient(to right, rgba(92, 4, 186), rgba(40, 3, 171))`,
        // backgroundColor: "#0b327a",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#ac89e8",
          fontFamily: "'Ultra', serif",
        }}
      >
        Welcome to DirectFN Pvt(Ltd)
      </Typography>
      {/* <Carousel
        plugins={[
          "infinite",
          {
            resolve: autoplayPlugin,
            options: {
              interval: 2000,
            },
          },
        ]}
        animationSpeed={1000}
      > */}
      <Typography
        variant="h5"
        sx={{
          color: "#a4edf5",
          fontWeight: "bold",
          mt: 4,
          textAlign: "center",
          fontFamily: " 'Poiret One', cursive",
        }}
      >
        Our Vision
      </Typography>
      <Typography
        sx={{
          color: "white",
          fontWeight: "bold",
          mt: 2,
          textAlign: "center",
          fontFamily: "'Fascinate', cursive",
        }}
      >
        To be the most sought after Sri Lankan Company providing prefferred
        solutions for personal care cleaning needs of customers in both local
        and selected international makerts....
      </Typography>

      {/* {topics.map((topic) => (
          <Typography
            component={"span"}
            key={topic}
            sx={{ color: "#290f91", fontWeight: "bold" }}
          >
            {topic}
          </Typography>
        ))} */}
      {/* </Carousel> */}
    </Card>
  );
}

export default MainBox;
