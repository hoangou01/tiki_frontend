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
  const [categories, setCategories] = useEffect([]);
  const [loading, setLoading] = useState(false);
  const [err,setErr] = useState("");
  const {sellerId} = useParams()
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
  const PostProduct = async () => {
    try {
      let form = new FormData();
      form.append("description", product.description);
      form.append("name", product.name);
      form.append("base_price", product.base_price);
      form.append("product_sku", product.product_sku);
      form.append("quantity", product.quantity);
      form.append("salable_quantity", product.salable_quantity);
      form.append("discount", product.discount);
      form.append("category",);

      // alert(customer.firstName + customer.lastName + customer.username+customer.phone+ customer.is_customer)
      if (image.current.files.length > 0)
        form.append("image", image.current.files[0]);

      let res = await authAPI.post(endpoints["add-product"(sellerId)], form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) nav("/");
      else setErr("there is a error, please turn back a few minute!");
    } catch (ex) {
      let msg = "";
      for (let e of Object.values(ex.response.data)) msg += `${e} `;

      setErr(msg);
      // setLoading(false)
    } finally {
      setLoading(false);
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
  const renderAddProduct = () => {
    <>
      <Container>
        <h1 className="addproduct_tittle">Thêm Sản phẩm</h1>
        <Row>
          <Form className="form_addproduct">
            <input type={Text} placeholder="Nhập tên sản phẩm" />
            <input
              type={Text}
              placeholder="Nhập giá sản phẩm"
              pattern="^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,3})(\.[0-9]{2})?$"
            />
            <input type={Text} placeholder="Nhập SKU" />
            <input type={Number} placeholder="Nhập số lượng sản phẩm" />
            <input type={File} placeholder="ảnh" />

            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              {categories.map((c) => (
                <option value={c.id}>{c.categoryname}</option>
              ))}
            </Form.Select>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>;
  };
  return <>{loading ? <LoadingSpinner /> : renderAddProduct}</>;
};
export default AddProduct;
