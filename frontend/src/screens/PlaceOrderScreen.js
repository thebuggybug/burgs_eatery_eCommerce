import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 500 ? 0 : 80).toFixed(2);
  cart.taxPrice = Number(0.10 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  if (!cart.paymentMethod) {
    history.push("/payment");
  }
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, history, dispatch]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row list border-0" >
        <div className="col-md-12 list border-0" >
          <ListGroup variant="flush" className="list border-0">
            <ListGroup.Item>
              <div className="mb-4">
                <h2><b>Order invoice:</b></h2>
                <hr className="w-25 m-0"></hr>
              </div>
              <strong>
                {cart.cartItems.length > 0 ? (
                  <ListGroup
                    variant="flush"
                    className="card"
                  >
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index} className="list">
                        <div className="row m">
                          <div className="col-md-1">
                            <img
                              src={item.image}
                              className="img-fluid rounded"
                            />
                          </div>
                          <div className="col my-auto text-center">
                            <Link
                              className="text-dark"
                              to={`/product/${item.product}`}
                            >
                              {item.name}
                            </Link>
                          </div>
                          <div className="col-md-4 my-auto text-center">
                            {item.qty} x {"Rs. "}
                            {item.price} {" ="} &nbsp;
                            <u className="text-success">
                              Rs. {(item.qty * item.price).toFixed(2)}
                            </u>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  "Your Bag seems to be empty!"
                )}
              </strong>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-lg-4 my-2">
          <h2>
            <b>Transaction summary:</b>
          </h2>
          <hr className="w-25"></hr>

          <div className="card  border-0" >
            <div className="row my-2 px-3">
              <div className="col transaction_summary_placeorder">
                <p>Total:</p>
              </div>
              <div className="col transaction_summary_placeorder">
                <h6>Rs. {cart.itemsPrice}</h6>
              </div>
            </div>

            <div className="row my-2 px-3">
              <div className="col transaction_summary_placeorder">Sales Tax (10%):</div>
              <div className="col transaction_summary_placeorder">
                <h6>Rs. {cart.taxPrice}</h6>
              </div>
            </div>

            <div className="row my-2 px-3">
              <div className="col transaction_summary_placeorder">Shipping:</div>
              <div className="col transaction_summary_placeorder">
                <h6>Rs. {cart.itemsPrice > 0 ? cart.shippingPrice : 0} <span className="shippingDiscount"><i>{cart.shippingPrice > 0 ? "(Enjoy free shipping on order above Rs.500)" : "(Free Shipping)"}</i></span></h6>
              </div>
            </div>

            <div className="row my-2 px-3">
              <div className="col transaction_summary_placeorder" >Total:</div>
              <div className="col transaction_summary_placeorder">
                <h5 className="text-success"><b>Rs. {cart.itemsPrice > 0 ? cart.totalPrice : 0}</b></h5>
              </div>
            </div>
            <div>{error && <h2>{error}</h2>}</div>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-lg-4 my-2">
            <h2>
              <b>Dispatch to:</b>
              <hr className="w-25"></hr>
            </h2>
            <div className="card shipping-details-card border-0">
              <div className="shipping_address_summary">
                <h6 className="py-2 px-3">City: {cart.shippingAddress.address},</h6>
                <h6 className="py-2 px-3">
                  Address:  {cart.shippingAddress.city} - {cart.shippingAddress.postalCode},
                </h6>
                <h6 className="py-2 px-3">
                  Contact: {cart.shippingAddress.contact}, &nbsp;
                </h6>
                <h6 className="py-2 px-3">
                  Country: {cart.shippingAddress.country} &nbsp;
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-end my-2">
          {cart.cartItems != 0 && (
            <Button
              type="button"
              variant="outline-success"
              onClick={placeOrder}
            >
              Proceed to payment 💳
            </Button>
          )}
        </div>
      </div>
    </div >
  );
}

export default PlaceOrderScreen;
