import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <Link to="/" className="btn btn-success rounded mt-3 mb-5 ">
        <span className="button_goBack">Back to menu 👈🏻</span>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-danger">{error}</h4>
      ) : (
        <div>
          <Row className="mb-5">
            <Col md={12} lg={6} className="my-4">
              <div className="">
                <img
                  src={product.image}
                  alt={product.name}
                  title={product.name}
                  className="img-fluid rounded product-details-image"
                />
              </div>
            </Col>
            <Col md={1} className="my-2"></Col>
            <Col md={12} lg={5}>
              <div className="pb-2">
                <h2>{product.name}</h2>
              </div>
              <div>
                <h6>
                  Serving Type: &nbsp;
                  {product.category ? (
                    <span className="badge bg-success rounded-pill">
                      {product.category}
                    </span>
                  ) : (
                    <span className="badge bg-info rounded-pill">
                      Any
                    </span>
                  )}
                </h6>
              </div>
              <div className="py-4">
                <div className="">
                  <h3>
                    Price: &nbsp; Rs.
                    {product.price ? ` ${product.price}` : "Rs. 0.00"}
                  </h3>
                </div>
                <div className="">
                  <h5>
                    Avaibility: &nbsp;
                    {product.countInStock > 0 ? (
                      "ready to ship"
                    ) : (
                      <span className="text-danger">Currently we are not serving at the moment ☹️</span>
                    )}
                  </h5>
                </div>
                <div className="">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} people have reviewed  ${product.name}`}
                    color="green"
                  />
                </div>
              </div>
              {product.countInStock > 0 && (
                <div>
                  <Row>
                    <Col xs={4} lg={5} xl={5} md={5} className="my-auto">
                      <h5>Select Quantity to order:</h5>
                    </Col>
                    &nbsp; &nbsp;&nbsp;
                    <Col xs={3} lg={3} xl={3} md={3}>
                      <div className="d-flex justify-content-center align-items-center">
                        <Button
                          variant="outline-success"
                          className="px-2"
                          disabled={qty <= 1}
                          onClick={() => setQty(qty - 1)}
                        >
                          <i className="fas fa-minus"></i>
                        </Button>
                        <Form.Control
                          as="input"
                          type="number"
                          min={0}
                          max={product.countInStock}
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="text-center mx-2"
                          style={{ width: "60px" }}
                          disabled
                        />
                        <Button
                          variant="outline-success"
                          className=" px-2"
                          disabled={qty >= product.countInStock}
                          onClick={() => setQty(qty + 1)}
                        >
                          <i className="fas fa-plus"></i>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row className="text-center" >
                    <Col lg={9.5} md={10}>
                      <span className="max_stock">Max you can order: {product.countInStock}</span>
                    </Col>
                  </Row>
                  <Row className="my-3 text-center">
                    <Col lg={5} xl={10} md={10}>
                      <Button
                        onClick={addToCartHandler}
                        className="rounded btn"
                        variant="outline-success"
                        disabled={product.countInStock === 0}
                        type="button"
                      >
                        Add to Basket 🧺 <i class="fa-solid fa-basket-shopping"></i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
              <Col>
                <Row>
                  <Col>
                    <h4 className="py-3">What's with the <span className="product_product_name">{product.name}:</span></h4>
                    <p>{product.description}</p>
                    <hr className="w-25" />
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>


          <Row className="my-5">
            <Col sm={12} md={6} lg={6} xl={6}>
              <div>
                <h4 className="pb-2">Listen to what other says:</h4>
                {product.reviews.length === 0 && (
                  <h4 className="text-warning">
                    Be the one first to taste and make it taste to other 🥞
                  </h4>
                )}
              </div>
              <div>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id} className="py-2 border-0" border-0>
                    <p className="reviewer_user">
                      {review.name} says:
                    </p>
                    <hr className="w-25 m-0 mb-2" />
                    <h6>{review.comment}</h6>
                    <Rating value={review.rating} color="green" />
                    <p className="reviewuser_date">
                      on: &nbsp;{review.createdAt.substring(0, 10)}
                    </p>
                  </ListGroup.Item>
                ))}
              </div>
            </Col>
            <Col className="my-4"></Col>
            <Col xs={12} sm={12} md={5} lg={5} xl={5}>
              <div>
                <h4 className="pb-2">Write a review:</h4>
                <ListGroup.Item className="list">
                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <h3 variant="success">Thanks ! We've marked your words</h3>
                  )}
                  {errorProductReview && (
                    <h4 className="text-danger">{errorProductReview}</h4>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <div>
                        {" "}
                        <Form.Group controlId="rating">
                          <Form.Label>
                            <h6>How was the taste ?</h6>
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            style={{ borderRadius: "12px" }}
                          >
                            <option value="">Select your flavor scale ...</option>
                            <option value="1">1⭐ - Needs improvement</option>
                            <option value="2">2⭐ - Average</option>
                            <option value="3">3⭐ - Above average</option>
                            <option value="4">4⭐ - Outstanding</option>
                            <option value="5">5⭐ - Exceptionally delicious</option>
                          </Form.Control>
                        </Form.Group>
                      </div>
                      <div className="py-2">
                        <Form.Group controlId="comment">
                          <Form.Label>
                            <h6>Review with your words: </h6>
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            row="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ borderRadius: "12px" }}
                            placeholder="Yummmyy... or not so much?"
                          ></Form.Control>
                        </Form.Group>
                      </div>

                      <div className="py-2 text-end">
                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="outline-success"
                          className="rounded"
                        >
                          Send it in 📎
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <h2 variant="warning">
                      Please <Link to="/login">login</Link> to submit your taste review:
                    </h2>
                  )}
                </ListGroup.Item>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
