import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import API, { endpoints } from "../configs/API";
import React, { Component } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
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
  const [categories, setCategories] = useEffect([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        var res = await API.get(endpoints["categories"]);
      } catch (error) {
        setIsLoading(false);
      }
      setIsLoading(false);
      setCategories(res.data);
    };

    loadCategories();
  }, []);
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
              {categories.map(c => 
                <option value={c.id}>{c.categoryname}</option>
              )}
            </Form.Select>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>;
  };
  return (<>
    {isLoading ? <LoadingSpinner /> : renderAddProduct}
  </>);
};
export default AddProduct;
