import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import API, { endpoints } from "../configs/API";
import ProductDescription from "../components/productpage/ProductDescription";
import ProductDetail from "../components/productpage/ProductDetail";
import ProductEvaluate from "../components/productpage/ProductEvaluate";
import RecommendProduct from "../components/productpage/recommendProduct";

const Product = () => {
  return (
    <>
      <div id="product_section">
        <Container>
          <div class="product_detail">
            <Row>
              <Col md={12}>
                <ul class="list_link">
                  <li>
                    <a href="">Trang chủ </a>
                  </li>
                  <li>
                    <a href=""> Đồ chơi mẹ và bé</a>
                  </li>
                  <li>
                    <a href="">Đồ chơi</a>
                  </li>
                  <li>
                    <a href="">Gấu bông</a>
                  </li>
                </ul>
              </Col>
              <Col md={12}>
                <ProductDetail />
              </Col>
              <Col md={12}>
                <RecommendProduct />
              </Col>
              <Col md={12}>
                <Row>
                  <ProductDescription />
                </Row>
              </Col>
              <Col md={12}>
                <ProductEvaluate />
                
                <div class="advertisement_banner_section">
                  <Row>
                    <Col md={6}>
                      <div class="banner-1">
                        <picture>
                          <img
                            src="https://salt.tikicdn.com/ts/tka/ae/f8/a0/3460d2e936b56f2cfecee487a6132b28.png"
                            alt=""
                          />
                        </picture>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div class="banner-2">
                        <picture>
                          <img
                            src="https://salt.tikicdn.com/ts/tka/59/d4/71/ec8530779b16ea1028ace4230137cc92.jpg"
                            alt=""
                          />
                        </picture>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};
export default Product
