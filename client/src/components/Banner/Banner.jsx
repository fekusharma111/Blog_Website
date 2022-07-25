import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const Image = styled(Box)`
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
    center/55% repeat-x #000;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Heading = styled(Typography)`
  font-size: 70px;
  color: #ffffff;
  line-height: 1;
`;
const Subheading = styled(Typography)`
  font-size: 20px;
  color: #ffffff;
`;
const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <Subheading>Blogging Website</Subheading>
    </Image>
  );
};

export default Banner;
