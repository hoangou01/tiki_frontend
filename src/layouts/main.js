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
import Brands from "../components/mainPage/Brand";
import Categories from "../components/mainPage/categories";
import Items from "./items";
import ProductMain from "../components/mainPage/Products";
const Main = () => {
  return (
    <>
      <div id="main">
        <div id="content">
          <Container>
            <Row>
              <Col md={2}>
                <Brands />
                <Categories />
              </Col>

              <Col md={10}>
                <Row>
                  <ProductMain />
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Main;
