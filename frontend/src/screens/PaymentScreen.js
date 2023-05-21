import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend"><h2>Plese choose desired Payment Method:</h2></Form.Label>
            <hr className="w-25"></hr>
            <div className="col pt-4">
              <Form.Check
                type="radio"
                label="PayPal/Debit/Credit Card"
                id="PayPal"
                name="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
              ></Form.Check>
            </div>
            <div className="col">
              <Form.Check
                type="radio"
                label="Cash on Delivery (CoD)"
                id="Cash on Delivery (CoD)"
                name="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={true}
              ></Form.Check>
            </div>
            <div className="col">
              <Form.Check
                type="radio"
                label="E-Wallet/Online Banking"
                id="E-Wallet/Online Banking"
                name="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={true}
              ></Form.Check>
            </div>
          </Form.Group>
          <div className="text-end">
            <Button type="submit" variant="outline-success" className="my-4 rounded">
              Proceed to Checkout with {paymentMethod}
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}

export default PaymentScreen;
