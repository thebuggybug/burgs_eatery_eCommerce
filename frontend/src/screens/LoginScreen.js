import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
// import Logo from "../images/logoWhite.png";

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div
      className="container-fluid  signin-container"
      style={{ height: "90vh" }}
    >
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {loading && <Loader />}

      <div className="row" style={{ background: "#ffffff" }}>
        <div
          className="col-lg-5  login-login-container"
          style={{ height: "90vh" }}
        >
          <div className="_sign_in">
            <div className="text-center">
              <h2>Login to Your Account</h2>
              <hr className="w-25"></hr>
            </div>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email" className="py-2">
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password" className="py-2">
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <div className="text-center d-grid py-2">
                <Button
                  type="submit"
                  variant="outline-success"
                >
                  Sign In
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div
          className="col-lg-7 login-signup-container text-white text-center"
          style={{ height: "90vh" }}
        >
          <div className="_login_register_div">
            <div>
              <div className="py-2">
                <h2>Are you new here ?</h2>
              </div>
              <div className="_new_to_portal">
                <p>
                  Sign up to Burgs Eatery and enjoy easy and convenient online ordering. Simply create an account with us and gain access to our delicious menu items, special deals, and exclusive promotions. With your account, you'll be able to save your favorite orders for faster checkout, track your order status, and receive updates on new menu items. Don't miss out on the benefits of being a registered member | sign up today!
                </p>
              </div>

              <div className="text-center d-grid py-2">
                <Link
                  to={
                    redirect ? `/register?redirect=${redirect}` : "/register"
                  }
                  type="submit"
                  className="btn-light  btn-block btn-lg"

                >
                  {" "}
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
