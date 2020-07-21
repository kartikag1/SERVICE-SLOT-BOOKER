import React, { useState } from "react";
import Base from "../core/Base";
import FlashMessage from "react-flash-message";
import { signup } from "../auth/helper/index";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (property) => (event) => {
    setValues({ ...values, error: false, [property]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };

  const performRedirect = () => {
    if (success) {
      return <Redirect to="/signin" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/booking" />;
    }
  };

  const SignUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="NAME"
                onChange={handleChange("name")}
                value={name}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="EMAIL"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="PASSWORD"
                onChange={handleChange("password")}
                value={password}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block form-control"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <FlashMessage duration={1500} persistOnHover={true}>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-success"
              style={{ display: success ? "" : "none" }}
            >
              You were registered successfully!
              <button
                onClick={(event) => (window.location.href = "/signin")}
                className="btn btn-warning"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </FlashMessage>
    );
  };

  const errorMessage = () => {
    return (
      <FlashMessage duration={1500} persistOnHover={true}>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>
          </div>
        </div>
      </FlashMessage>
    );
  };

  return (
    <Base title="SignUp page" description="A page for user to signup!">
      {successMessage()}
      {errorMessage()}
      {SignUpForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signup;
