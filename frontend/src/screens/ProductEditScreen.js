import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    console.log("uploading");
    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to="/admin/productlist" className="btn btn-success rounded">
        👈🏻&nbsp; Go Back
      </Link>

      <FormContainer>
        <div className="my-4">
          <h2>Add/Edit dish ?</h2>
          <hr className="w-25"></hr>
        </div>
        {loadingUpdate && <Loader />}
        {errorUpdate && <h2 variant="danger">{errorUpdate}</h2>}
        {loading ? (
          <Loader />
        ) : error ? (
          <h2 variant="danger">{error}</h2>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Dish</Form.Label>
              <Form.Control
                type="name"
                placeholder="What's the dish name ?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="What's the price ?"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Default Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Upload image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <div className="my-2">
                <Form.Label htmlFor="image-file" className="form-label">
                  Select Image File
                </Form.Label>
                <Form.Control
                  type="file"
                  id="image-file"
                  label="Choose File"
                  accept="image/*"
                  custom
                  onChange={uploadFileHandler}
                />
                {uploading && <Loader />}
              </div>
            </Form.Group>

            <Form.Group controlId="countinstock" className="my-2">
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Dish stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Whats the category ?"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description about the dish"
                value={description}
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <div className="my-4 d-flex justify-content-end">
              <Button
                type="submit"
                variant="outline-success"
              >
                Update | Add Dish 🍽️
              </Button>
            </div>
          </Form>

        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
