import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/product";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import TopRated from "../components/TopRated";
import HomepageBanner from "../components/HomepageBanner";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = history.location.search;
  console.log(keyword);

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <Container >
        <Row className="my-5  ">
          <div className="col-xl-12 col-lg-12 col-md-12 my-4">
            <HomepageBanner />
          </div>
        </Row>
      </Container>
      <Container >
        <Row>
          <div className="mt-5">
            <h1> Just In: Delicious Dishes 🥘🍕 </h1>
            <hr className="w-25" />
          </div>
        </Row>
      </Container>

      {loading ? (
        <Loader />
      ) : error ? (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div>
          <Container>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Container>
          <Pagination page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
