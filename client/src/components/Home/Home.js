import { Grid } from "@mui/material";
import React from "react";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";

const Home = () => {
  return (
    <div>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid item lg={10} sm={10} xs={12}>
          Posts
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
