import { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import API, { authAPI, endpoints } from "../configs/API";
import React, { Component } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import InputItem from "./InputItem";

const AddProduct = () => {
  //   const [seller, setSeller] = useEffect([]);
  //   useEffect(() => {
  //     const loadSeller = async () => {
  //       let res = await API.get(endpoints["sellers"]);
  //       setSeller(res.data);
  //     };

  //     loadSeller();
  //   }, []);
  // load categories
  const [product, setProduct] = useState({
    description: "",
    name: "",
    base_price: null,
    product_sku: "",
    quantity: null,
    salable_quantity: null,
    discount: null,
    image: "",
    category: null,
  });
  const image = useRef();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { sellerId } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        var res = await API.get(endpoints["categories"]);
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
      setCategories(res.data);
    };

    loadCategories();
  }, []);
  const PostProduct = () => {
    const process = async () => {
      try {
        let form = new FormData();
        form.append("description", product.description);
        form.append("name", product.name);
        form.append("base_price", product.base_price);
        form.append("product_sku", product.product_sku);
        form.append("quantity", product.quantity);
        form.append("salable_quantity", product.quantity);
        form.append("discount", product.discount);
        form.append("category",product.category);
        form.append("seller",sellerId);
        console.log(sellerId)
        // alert(customer.firstName + customer.lastName + customer.username+customer.phone+ customer.is_customer)
        // if (image.current.files.length > 0)
        //   form.append("image", image.current.files[0]);

        let res = await authAPI().post(endpoints["add-product"](sellerId), form);
        if (res.status === 201) {
          alert("Add product succesfully!");
          nav("/");
        } else setErr("there is a error, please turn back a few minute!");
      } catch (ex) {
        alert(ex);
        let msg = "";
        for (let e of Object.values(ex.response.data)) msg += `${e} `;

        setErr(msg);
        // setLoading(false)
      } finally {
        setLoading(false);
      }
    };
    if (product.name == "") {
      setErr("please input name of product");
    } else if (product.base_price <= 0) {
      setErr("price of product isn't allow zero!");
    } else {
      setLoading(true);
      process();
    }
  };

  const setValue = (e) => {
    const { name, value } = e.target;
    setProduct((current) => ({ ...current, [name]: value }));
  };
  var renderErr = (
    <>
      <div className="text-danger ps-5 mb-5" style={{ marginTop: "-20px" }}>
        {err}
      </div>
    </>
  );
  if (err == "") {
    renderErr = (
      <>
        <div className="d-none text-danger">{err}</div>
      </>
    );
  }
  const renderAddProduct = (
    <>
      <Container>
        <h1 className="addproduct_tittle">Thêm Sản phẩm</h1>
        <Row>
          <Form onSubmit={PostProduct} className="form_addproduct">
            <InputItem
              label="Tên sản phẩm"
              id="form1"
              value={product.name}
              setValue={setValue}
              name="name"
              type="text"
            />
            <InputItem
              label="Giá sản phẩm"
              id="form1"
              value={product.base_price}
              setValue={setValue}
              name="base_price"
              type="text"
              pattern="^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,3})(\.[0-9]{2})?$"
            />
            <InputItem
              label="Mô tả sản phẩm"
              id="form1"
              value={product.description}
              setValue={setValue}
              name="description"
              type="textarea"
            />
            <InputItem
              label="SKU"
              id="form1"
              value={product.product_sku}
              setValue={setValue}
              name="product_sku"
              type="text"
            />
            <InputItem
              label="số lượng"
              id="form1"
              value={product.quantity}
              setValue={setValue}
              name="quantity"
              type="number"
            />
            <InputItem
              label="số lượng sản phẩm còn trong kho"
              id="form1"
              value={product.salable_quantity}
              setValue={setValue}
              name="salable_quantity"
              type="number"
            />
            <InputItem
              label="mã giảm giá"
              id="form1"
              value={product.discount}
              setValue={setValue}
              name="discount"
              type="number"
            />

            <Form.Select
              name="category"
              onChange={setValue}
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              {categories.map((c) => (
                <option value={c.id}>{c.categoryname}</option>
              ))}
            </Form.Select>
            {/* <InputItem label="ảnh sản phẩm" type="file" ref={image} /> */}
            {renderErr}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
  return <>{loading ? <LoadingSpinner /> : renderAddProduct}</>;
};
export default AddProduct;
