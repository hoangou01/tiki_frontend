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
const ProductDescription = ({productId}) => {
  // const [ProductDescription, setProductDescription] = useEffect([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const loadProductDescription = async () => {
  //     setIsLoading(true);
  //     try {
  //       var res = await API.get(endpoints["productDetail"](productId));
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //     }
  //     setProductDescription(res.data);
  //   };

  //   loadProductDescription();
  // }, [productId]);

  return (
    <>
      <div class="section_below_product">
        <Row>
          <Col md={10}>
            <div class="detail_info">
              <h5>Thông tin chi tiết</h5>
              <div class="d-flex">
                <div class="detail_info_left">
                  <ul>
                    <li>Thương hiệu</li>
                    <li>Xuất xứ thương hiệu</li>
                    <li>Xuất xứ</li>
                    <li>Kích thước</li>
                    <li>Chất liệu</li>
                  </ul>
                </div>
                <div class="detail_info_right">
                  <ul>
                    <li>Memon</li>
                    <li>Việt Nam</li>
                    <li>Việt Nam</li>
                    <li>30cm, 50cm, 70cm (đo chiều dài)</li>
                    <li>Vải,bông</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="product_description">
              <h5>Mô tả sản phẩm</h5>
              <div class="product_description_content">
                <p>
                  Chó corgi mập béo nhồi bông là dòng sản phẩm cao cấp, được lấy
                  cảm hứng từ nhân vật mà các bé yêu thích là Chú chó Corgi. Sản
                  phẩm cao cấp đường may bền đẹp với chất liệu nhung mềm mịn co
                  dãn 4 chiều, bông nhồi bên trong 100% là bông gòn 3D trắng
                  tinh khiết loại 1, độ đàn hồi tốt, không gây ngứa, không rụng
                  lông cực kỳ an toàn cho bé.{" "}
                </p>
                <picture>
                  <img
                    src="https://salt.tikicdn.com/ts/tmp/28/95/56/c072ae40536265b0034b718de4717bc3.jpeg"
                    alt=""
                  />
                </picture>
                <picture>
                  <img
                    src="https://salt.tikicdn.com/ts/tmp/28/95/56/c072ae40536265b0034b718de4717bc3.jpeg"
                    alt=""
                  />
                </picture>
                <picture>
                  <img
                    src="https://salt.tikicdn.com/ts/tmp/28/95/56/c072ae40536265b0034b718de4717bc3.jpeg"
                    alt=""
                  />
                </picture>
              </div>
            </div>
          </Col>
          <Col md={2}>
            <div class="advertisement-banner">
              <a href="">
                <picture>
                  <img
                    src="https://salt.tikicdn.com/cache/w1080/ts/tka/02/1a/ce/e6df1478b77162d689a042a5fd492efd.png.webp"
                    alt=""
                  />
                </picture>
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ProductDescription;
