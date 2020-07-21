import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import FlashMessage from "react-flash-message";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (property) => (event) => {
    setValues({ ...values, error: false, [property]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user) {
        return <Redirect to="/booking" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/booking" />;
    }
  };

  const SignInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <input
                value={email}
                onChange={handleChange("email")}
                className="form-control"
                type="email"
                placeholder="EMAIL"
              />
            </div>
            <div className="form-group">
              <input
                value={password}
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                placeholder="PASSWORD"
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block form-control"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <FlashMessage duration={5000} persistOnHover={true}>
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
    <Base title="SignIN page" description="A page for user to signin!">
      {loadingMessage()}
      {errorMessage()}
      {SignInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
