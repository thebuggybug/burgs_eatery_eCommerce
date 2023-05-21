import React from "react";
import Rating from "./Rating";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function product({ product }) {
  return (
    <>
      <Link to={`/product/${product._id}`}>
        <Card className="my-4 product_card">
          <Card.Img variant="top" className="product_card_img" src={product.image} />
          <Card.Body>
            <Card.Title className="product_card_title text-center">{product.name}</Card.Title>
            <Card.Text>
              {product.description.length > 120
                ? product.description.substring(0, 140) + " ...(see more)"
                : product.description}
            </Card.Text>

            <Card.Text>
              <div className="my-3">
                <Rating value={product.rating} text={<span style={{ fontSize: '12px' }}>Complemets by<b> {product.numReviews}</b> people</span>} color={'#eb8934'} />
              </div>
            </Card.Text>
            <div className="my-3">
              <Card.Text className="text-center">
                <span className="products_card_price">Rs. {product.price}</span>
              </Card.Text>
            </div>
            <Card.Text className="text-center">
              <Link to={`/product/${product._id}`}>
                <Button variant={product.countInStock > 0 ? "success" : "danger"} rounded-pill>
                  {product.countInStock > 0 ? "Let's make it" : "Out of Inventory"}
                </Button>
              </Link>
            </Card.Text>

          </Card.Body>
        </Card>
      </Link>
    </>
  );
}
