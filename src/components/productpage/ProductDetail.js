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
import LoadingSpinner from "../../components/LoadingSpinner";
import Seller from "./Seller";
const ProductDetail = (id) => {
  // const [productDetail, setproductDetail] = useEffect([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const loadProductDetail = async () => {
  //     setIsLoading(true);
  //     try {
  //       let res = await API.get(endpoints["productDetail"] + id);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //     }
  //     setproductDetail(res.data);
  //   };

  //   loadProductDetail();
  // }, []);

  return (
    <>
      <div class="product_detail_info">
        <Row>
          <Col md={4}>
            <div class="product_detail-left">
              <div class="product_detail-img">
                <picture>
                  <img
                    src="https://salt.tikicdn.com/cache/750x750/ts/product/7e/4c/61/d2a902b344f7a706e692081dcfd39ec2.jpg.webp"
                    alt=""
                  />
                </picture>
              </div>
              <div class="product_detail-listImg"></div>
              <div class="product_detail_socialmedia">
                <h5>Chia sẻ: </h5>
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-facebook.svg"
                  alt=""
                />
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-messenger.svg"
                  alt=""
                />
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-pinterest.svg"
                  alt=""
                />
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-twitter.svg"
                  alt=""
                />
              </div>
              <div class="product_detail_hotdeal">
                <a href="">
                  <picture>
                    <img
                      src="https://salt.tikicdn.com/cache/w1080/ts/tka/ae/f8/a0/3460d2e936b56f2cfecee487a6132b28.png.webp"
                      alt=""
                    />
                  </picture>
                </a>
              </div>
            </div>
          </Col>

          <Col md={8}>
            <div class="product_detail-right">
              <span>Thương hiệu</span> <span class="brand">Memon</span>
              <h4>
                Gấu bông chó Corgi cao cấp Memon - Thú nhồi bông chó corgi mập
                tròn dễ thương, mềm mịn
              </h4>
              <div class="rate_sold">
                <div class="rate">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    size="14"
                    color="#fdd836"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                    // style="color: rgb(253, 216, 54);"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    size="14"
                    color="#fdd836"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                    // style="color: rgb(253, 216, 54);"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    size="14"
                    color="#fdd836"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                    // style="color: rgb(253, 216, 54);"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    size="14"
                    color="#fdd836"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                    // style="color: rgb(253, 216, 54);"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    size="14"
                    color="#fdd836"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                    // style="color: rgb(253, 216, 54);"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  (xem 22 lượt đánh giá)
                </div>
                <div class="sold">
                  <span>còn lại</span>{" "}
                  <span class="salble_product">36 sản phẩm</span>
                </div>
              </div>
              <div class="price_discount_shop">
                <Row>
                  <Col md={8}>
                    <div class="price_discount">
                      <div class="price">
                        <h3 class="handled_price">370.000 đ</h3>
                      </div>
                      <span class="base_price">732.000</span>
                      <div class="discount">-49%</div>
                    </div>
                    <div class="size-section">
                      <span>Size: </span>
                      <span class="size">30cm</span>
                      <div class="list-size">
                        <div class="size-item">30cm</div>
                        <div class="size-item">60cm</div>
                        <div class="size-item active">90cm</div>
                      </div>
                    </div>
                    <div class="shipment-section">
                      <span>Giao đến</span>
                      <span class="address-ship">
                        Q.1, P.Bến nghé, Hồ Chí Minh -
                      </span>
                      <a href="" class="change-address">
                        đổi địa chỉ
                      </a>
                    </div>
                    <div class="freeship-section">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/67/e4/c2/02b5400b39bb3371e06d33c1e9f4d854.png"
                        alt=""
                      />
                      <div class="freeship">
                        <span>Vận chuyển:</span> <span>Miễn phí</span>{" "}
                        <span class="ship_price">18.000</span>
                      </div>
                    </div>
                    <div class="congratulation">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/bc/0c/39/b30a025f810d5257fbb56efb249151f3.png"
                        alt=""
                      />
                      <span>Chúc mừng bạn được freeship 100%.</span>
                    </div>
                    <div class="amount_buy">
                      <h5>Số Lượng</h5>
                      <div class="number">
                        <button class="btn_decrease">-</button>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value="1"
                          class="number_input"
                        />
                        <button class="btn_increase">+</button>
                      </div>
                      <div class="button_buy">
                        <a href="" class="btn_buy">
                          Chọn mua
                        </a>
                        <a href="" class="btn_add_card">
                          Thêm giỏ hàng
                        </a>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <Seller/>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ProductDetail;