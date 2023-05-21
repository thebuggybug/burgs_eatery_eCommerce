import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import BurgsLogo from "../assets/images/Burgs_logo.png"


function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    sessionStorage.removeItem("cartItems");
    localStorage.clear();
    window.location.reload();
  };
  const [keyword, setKeyword] = useState("");
  let history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="xl" className="container py-auto my-4">
        <Container className="">
          <LinkContainer to="/">
            <Navbar.Brand className="p-0 ">
              <img src={BurgsLogo} alt="Burgs Logo" className="_logo" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto  text-center ">
              <Form onSubmit={submitHandler}>
                <FormControl
                  type="text"
                  name="query"
                  placeholder="I am looking for... 🍔"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Nav>
            <Nav
              className="d-flex navigation text-center sticky-top"
              aria-controls="navbarScroll"
            >
              <hr className="w-25 d-xl-none mx-auto mt-5" />
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin Controls" id="adminMenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>
                      Manage users
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>
                      Manage inventory
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      Manage orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name + (userInfo.isAdmin ? '*' : '')} id="username">

                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      My Profile&nbsp; &nbsp; &nbsp;<i className="far fa-user"></i>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log Out&nbsp;&nbsp;&nbsp;  <i class="fas fa-sign-out-alt"></i>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="far fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/cart">
                <Nav.Link className="" cart>
                  Cart <i className="fas fa-cart-plus"></i>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/news">
                <Nav.Link className="" news disabled>
                  News <i className="fa fa-newspaper-o"></i>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/menu">
                <Nav.Link className="" news disabled>
                  Menu <i className="fa fa-book"></i>
                </Nav.Link>
              </LinkContainer>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
