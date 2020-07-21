import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Booking from "./user/booking";
import Home from "./user/Home";
import PrivateRoute from "./auth/helper/PrivateRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/booking" exact component={Booking} />
        <Route exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
