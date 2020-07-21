import React from "react";
import { isAuthenticated } from "../auth/helper";
import { Redirect } from "react-router-dom";

const Home = () => {
  {
    if (isAuthenticated()) {
      return <Redirect to="/booking" />;
    }
    return <Redirect to="/signup" />;
  }
};

export default Home;
