import React, { useState, useEffect, useRef } from "react";
// ------------------

import { Link } from "react-router-dom";
// ------------------

import { Button, ListGroup, Col } from "react-bootstrap";
// ------------------

import { useDispatch, useSelector } from "react-redux";
// ------------------

import {
  getOrderDetails,
  payOrder,
  deliveredOrder,
} from "../actions/orderActions";
// ------------------

import Loader from "../components/Loader";
// ------------------

import { PayPalButton } from "react-paypal-button-v2";
// ------------------

import {
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from "../constants/orderConstants";
// ------------------

import { useReactToPrint } from "react-to-print";



function OrderScreen({ match, history }) {
  let componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { success: successDelivered, loading: loadingDelivered } =
    orderDelivered;

  // since we want user details too ( only admin user can access ...)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUgiAjqoSNGOjA7ledbbHOE6lxRuWc9_OtB5UmnGN0d-QFXQ-6dg6ECcCGQHCwrgFStzXm0RTw8UAwiy";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDelivered
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDelivered]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliveredHandler = () => {
    dispatch(deliveredOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <h3>{error}</h3>
  ) : (
    <div>
      <div className="row" ref={componentRef}>
        <div className="col-lg-7 my-4">
          <ListGroup variant="flush">
            <ListGroup.Item className="">
              <div className="">
                <h2>
                  Your Order Summary:
                  <hr className="w-25"></hr>
                </h2>
              </div>
              <strong>
                <b>
                  {order.orderItems.length === 0 ? (
                    "You have no prior orders"
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <div className="row">

                            <div className="col-md-1 my-auto">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="img-fluid rounded"
                                title={item.name}
                              />
                            </div>
                            <div className="col my-auto">
                              <Link
                                className="text-dark"
                                to={`/product/${item.product}`}
                              >
                                {item.name}
                              </Link>
                            </div>
                            <div className="col-md-5 my-auto">
                              {item.qty} x {"Rs. "}
                              {item.price} ={" "}
                              <u className="text-success">
                                {"Rs. "}
                                {(item.qty * item.price).toFixed(2)}
                              </u>
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </b>
              </strong>
            </ListGroup.Item>
            <div className="row my-4">
              <div className="col-lg-12 col-md-12 my-2 col-sm-12 order-shipping-card">
                <ListGroup.Item>
                  <div className="py-2">
                    <h2>
                      Shipping Details:
                      <hr className="w-25"></hr>
                    </h2>
                  </div>
                  <div className="my-2 py-2">
                    <h6>
                      Oder ID:<span className="text-info"> {order._id}</span>
                    </h6>
                    <h6>
                      Name:<span className="text-info"> {order.user.name}</span>
                    </h6>
                    <h6>
                      E-mail:{" "}
                      <span className="text-info">{order.user.email}</span>
                    </h6>
                    <h6>
                      Contact:{" "}
                      <span className="text-info">
                        {" "}
                        {order.shippingAddress.contact}
                      </span>
                    </h6>
                    <h6>
                      Order ID: <span className="text-info"> {orderId}</span>
                    </h6>
                  </div>

                  <strong>
                    <h6>Deliveries:</h6>
                    <b>
                      {order.shippingAddress.address},
                      {order.shippingAddress.city},
                      {order.shippingAddress.region},
                      {order.shippingAddress.postalCode},
                      {order.shippingAddress.country}
                    </b>
                  </strong>
                </ListGroup.Item>
              </div>
            </div>
            <div className="row my-4">
              <div className="col-lg-12 col-md-12 my-2 col-sm-12 my-auto">
                <ListGroup.Item>
                  <div>
                    <h2>
                      Payment Info:
                      <hr className="w-25"></hr>
                    </h2>
                  </div>

                  <div className="my-2 py-2 row">
                    <div className="col-xl-8 col-md-8 col-lg-8">
                      <h6>
                        Name:
                        <span className="text-info"> {order.user.name}</span>
                      </h6>
                      <h6>
                        E-mail:{" "}
                        <span className="text-info">{order.user.email}</span>
                      </h6>
                      <h6>
                        Total :{" "}
                        <span className="text-success ">
                          Rs. {order.totalPrice}
                        </span>
                      </h6>
                    </div>
                  </div>
                </ListGroup.Item>
              </div>
            </div>
            <div className="row my-4">
              <div className="text-black mb-2">
                <h2>Payment & Deliveries: </h2>
                <hr className="w-25"></hr>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <ListGroup.Item>
                  <div>
                    <h2>
                      Payment:
                    </h2>
                  </div>
                  <div>
                    {order.isPaid ? (
                      <>
                        <Col>
                          <h6>
                            <i
                              className="fas fa-check"
                              style={{ color: "green" }}
                            ></i>
                            &nbsp; Paid on:{" "}
                            <span className="text-success">
                              {order.paidAt.substring(0, 10)}
                            </span>
                          </h6>
                        </Col>
                      </>
                    ) : (
                      <h6 className="text-danger">
                        Not
                        paid
                      </h6>
                    )}
                  </div>
                </ListGroup.Item>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <ListGroup.Item>
                  <div>
                    <h2>
                      Delivery:
                    </h2>
                  </div>
                  <div>
                    {order.isDelivered ? (
                      <h6>
                        <i className="fas fa-check text-success"></i>{" "}
                        &nbsp;Delivered on:
                        <span className="text-success">
                          {" "}
                          {order.deliveredAt.substring(0, 10)}{" "}
                        </span>
                      </h6>
                    ) : (
                      <h6 className="text-danger">
                        Not
                        Delivered
                      </h6>
                    )}
                  </div>
                </ListGroup.Item>
              </div>
            </div>
          </ListGroup>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-4 my-4">
          <div className="mb-5">
            <h2>{userInfo ? userInfo.name : "Hello Guest"}, Your bill summary is: </h2>
            <hr className="w-25"></hr>
          </div>
          <div className="card">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="row">
                  <div className="col">Items total:</div>
                  <div className="col">
                    <b>Rs. {order.itemsPrice}</b>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="row">
                  <div className="col">VAT | TAX:</div>
                  <div className="col">
                    <b>Rs. {order.taxPrice} </b>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="row">
                  <div className="col">Shipping charges:</div>
                  <div className="col">
                    <b>Rs. {order.shippingPrice}</b>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="row">
                  <div className="col">Grand Total:</div>
                  <div className="col">
                    <b>Rs. {order.totalPrice}</b>
                  </div>
                </div>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={(order.totalPrice * 0.0084).toFixed(2)}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
            {loadingDelivered && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item className="text-center">
                  <Button
                    className="btn mx-2"
                    variant="outline-success"
                    onClick={deliveredHandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
