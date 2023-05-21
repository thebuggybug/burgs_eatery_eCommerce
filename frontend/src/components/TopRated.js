import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Loader from "./Loader";
import { listTopProducts } from "../actions/productActions";
// import product from "./product";

function TopRated() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);

  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <Carousel pause="hover" className="text- ">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div className="top-rated-prod-img">
              <img
                src={product.image}
                className=""
                alt={product.name}
                title={product.name}
              // style={{height:"20px"}}
              ></img>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default TopRated;