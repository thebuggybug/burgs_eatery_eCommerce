import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingScreen({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [region, setRegion] = useState(shippingAddress.region);
  const [contact, setContact] = useState(shippingAddress.contact);
  const [validationError, setValidationError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !country || !region || !contact) {
      setValidationError("Please fill in all required fields.");
    } else {
      dispatch(
        saveShippingAddress({
          address,
          city,
          postalCode,
          country,
          region,
          contact,
        })
      );
      history.push("/payment");
    }
  };

  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <div className="pt-4">
          <h1>Shipping Details</h1>
        </div>
        <div className=" my-5">
          {" "}
          <Form onSubmit={submitHandler}>
            {validationError && (
              <Alert variant="danger">{validationError}</Alert>
            )}

            <Form.Group controlId="postalCode" className="my-2">
              <Form.Label>Contact Number*</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter Your Contact/Phone Number: "
                value={contact ? contact : ""}
                onChange={(e) => setContact(e.target.value)}
                maxLength={10}
              ></Form.Control>

            </Form.Group>

            <Form.Group controlId="address" className="my-2">
              <Form.Label>Address (nearest landmark)*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Your Shipping Address"
                value={address ? address : ""}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city" className="my-2">
              <Form.Label>City*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Your Shipping City"
                value={city ? city : ""}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode" className="my-2">
              <Form.Label>Zip/Postal Code*</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter Your City Zip/Postal Code"
                value={postalCode ? postalCode : ""}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode" className="my-2">
              <Form.Label>Zone/State*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Your Shipping zone/region "
                value={region ? region : ""}
                onChange={(e) => setRegion(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country" className="my-2">
              <Form.Label>Country You Reside*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Your Shipping Country"
                value={country ? country : ""}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="text-end">

              <Button type="submit" variant="outline-success " className="my-4 rounded text-end">
                Proceed to payment 💳
              </Button>
            </div>

          </Form>
        </div>
      </FormContainer>
    </div>
  );
}



