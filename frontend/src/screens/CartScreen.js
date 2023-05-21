import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Form, ListGroup, Button } from "react-bootstrap";
function CartScreen({ match, location, history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  const now = new Date();
  const hour = now.getHours();
  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <div className="row my-5">
      <div className="col-md-8  ">
        {cartItems.length === 0 ? (
          <div className="" role="alert">
            <h4 className="text-warning">
              Opps! It seems like your cart is Empty... Shop More by clicking:{" "}
              <Link to="/"> Products </Link>{" "}
            </h4>
          </div>
        ) : (
          <div>
            <h3>Whats in my bag ?</h3>
            <hr className="w-25" />
            <ListGroup className="my-4">
              <div className="row d-lg-none d-sm-none d-xl-flex">
                <div className="col-md-2 text-center cart-product">
                  <p>Item photo</p>
                </div>
                <div className="col-md-3 text-center cart-product">
                  <p>Item Name</p>
                </div>
                <div className="col-md-2 text-center cart-product">
                  <p>Item Price (each)</p>
                </div>
                <div className="col-md-3 text-center cart-product">
                  <p>Quantity</p>
                </div>
                <div className="col-md-2 text-center cart-product">
                  <p>Action</p>
                </div>
              </div>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className="list">
                  <div className="row py-4">
                    <div className="col-md-2 my-auto">
                      <img
                        src={item.image}
                        className="img-fluid rounded"
                        alt={item.name}
                        title={item.name}
                      />
                    </div>
                    <div className="col-md-3 my-auto py-2 ">
                      <Link
                        className="text-dark "
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="col-md-2 my-auto py-2">
                      <h6 className="text-success">Rs.{item.price}</h6>
                    </div>
                    <div className="col-md-3 my-auto py-2">
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            key={x + 1}
                            value={x + 1}
                            className="text-center"
                          >
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                    <div className="col-md-2 my-auto text-center py-2  text-center">
                      <Button
                        variant="outline-danger"
                        onClick={() => removeItemHandler(item.product)}
                        title={`Delete ${item.name} from your bag ?`}
                      >
                        <i className="fas fa-trash "></i>
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="col-md-4 my-5  ">
          <div
            className="card border-0 "

          >
            <div className="card-body order-summary-card">
              <ul className="list">
                <li className="list-group-item">
                  <h6 className="cart_summary_card_username text-center py-2">
                    {userInfo ? (
                      <>
                        {greeting}, {userInfo.name}!
                      </>
                    ) : (
                      <>
                        {greeting}, Guest! Your invoice will be generated as:
                        <h6 className="text-warning"><i>(before going further, make sure to log in)</i></h6>
                      </>
                    )}
                  </h6>
                </li>
                <li className="list-group-item my-0 py-0">
                  &nbsp;
                  <h5 className="py-0">
                    You've added &nbsp;
                    <span className=" itemNo_cart_card">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                    {"  "} {" "}items to your bag
                  </h5>
                </li>
                <li className="list-group-item">
                  <h5>
                    You'll need to pay:
                    <span className="text-success amount_cart_card">
                      &nbsp; Rs. {" "}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </span>
                  </h5>
                </li>
                <li className="list-group-item text-center py-2">
                  <button
                    className="btn btn-outline-success"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Checkout &nbsp;{" "}
                    <i class="far fa-credit-card"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CartScreen;
