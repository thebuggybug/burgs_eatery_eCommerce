import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import BurgsLogo from "../assets/images/Burgs_logo.png"


function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Your Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div className="container-fluid signin-container">
      <div className="row">
        <div className="col-md-6 bg-white p-5">
          <div className="text-center mb-5">
            <img src={BurgsLogo} alt="Burgs logo" className="register-image" />
          </div>
          <h2>Already have an account?</h2>
          <p>Login to Burgs Eatery!</p>
          <div className="text-center py-3">
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              type="submit"
              variant="success"
              className="btn-success btn"
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="col-md-6 bg-light p-5">
          <div className="text-center mb-5">
            <h1>Registration</h1>
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {loading && <Loader />}
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                className="form-control"
                id="name"
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="text-center mt-5">
              <Button type="submit" className="" variant="outline-success">
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default RegisterScreen;
