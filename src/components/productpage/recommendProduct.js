import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import API, { endpoints } from "../../configs/API";
import React, { Component } from "react";
import LoadingSpinner from "../LoadingSpinner";
import Seller from "./Seller";
import Items from "../../layouts/items";
const RecommendProduct = ({ cateId }) => {
  // const [RecommendProduct, setRecommendProduct] = useEffect([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const loadRecommendProduct = async () => {
  //     setIsLoading(true);
  //     try {
  //       var res = await API.get(endpoints["recommendproducts"](cateId));
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //     }
  //     setRecommendProduct(res.data);
  //   };

  //   loadRecommendProduct();
  // }, [cateId]);
  const renderRecommendProduct = (
    <>
      <div class="recommend-product-section">
        <h5>Sản phẩm tương tự</h5>
        <div class="recommend-product-list">
          <Row>
            <Col md={2}>
              <Items />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
  return (
    <>
      {renderRecommendProduct}
    </>
  );
};
export default RecommendProduct;
