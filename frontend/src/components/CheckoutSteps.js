import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to="/login">
              <Nav.Link className="checklist_success">Login/Register</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Login/Register</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step2 ? (
            <LinkContainer to="/shipping">
              <Nav.Link className="checklist_success">Shipping Details</Nav.Link>

            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping Details</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step3 ? (
            <LinkContainer to="/payment">
              <Nav.Link className="checklist_success">Payment Method</Nav.Link>

            </LinkContainer>
          ) : (
            <Nav.Link disabled>Payment Method</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step4 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link className="checklist_success">Order Placement</Nav.Link>

            </LinkContainer>
          ) : (
            <Nav.Link disabled>Order Placement</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default CheckoutSteps;
