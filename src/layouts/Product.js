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
import ProductDescription from "../components/productPage/ProductDescription";
import ProductDetail from "../components/productPage/ProductDetail";
import ProductEvaluate from "../components/productPage/ProductEvaluate";
import RecommendProduct from "../components/productPage/recommendProduct";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
const Product = () => {
  // const [q] = useSearchParams()
  // var productId = q.get("productId")
  // const [productDetail, setproductDetail] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const loadProductDetail = async () => {
  //     setIsLoading(true);
  //     try {
  //       var res = await API.get(endpoints['product-detail'](productId));
  //     } catch (error) {
  //       setIsLoading(false);
  //     }
  //     setIsLoading(false);
  //     setproductDetail(res.data);
  //   };

  //   loadProductDetail();
  // }, [productId]);
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
                <ProductDetail  />
              </Col>
              <Col md={12}>
                <RecommendProduct  />
              </Col>
              <Col md={12}>
                <Row>
                  <ProductDescription  />
                </Row>
              </Col>
              <Col md={12}>
                <ProductEvaluate  />
                
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
