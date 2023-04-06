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
const Seller = ({productId}) => {
  // const [seller, setSeller] = useEffect([]);
  // useEffect(() => {
  //   const loadSeller = async () => {
  //     let res = await API.get(endpoints["sellers"](productId));
  //     setSeller(res.data.results);
  //   };

  //   loadSeller();
  // }, [productId]);
  return (
    <>
      <div class="shop">
        <div class="shop_info">
          <img
            src="https://vcdn.tikicdn.com/ts/seller/d7/7e/88/1fd74bf1e3ed61849fb5a9d6a26579d3.jpg"
            alt=""
          />
          <div class="shop_name">
            <h5>MEMON</h5>
            <img
              src="https://salt.tikicdn.com/cache/w100/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png.webp"
              alt=""
            />
          </div>
        </div>
        <div class="shop_rate">
          <div class="rate">
            <span>
              4.7/5{" "}
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
            </span>
            <span>đánh giá</span>
          </div>
          <div class="category">
            <span>230+</span>
            <span>danh mục</span>
          </div>
        </div>
        <div class="btn_watch_shop">
          <img
            src="https://salt.tikicdn.com/ts/upload/49/27/ff/d735c33edfdc6cf6aeb6e183bec28869.png"
            alt=""
          />
          <span>Xem shop</span>
        </div>
        <div class="warranty">
          <div class="warranty_time">
            <span>Thời gian bảo hành</span>
            <span>1 năm</span>
          </div>
          <div class="warranty_type">
            <div class="row">
              <span>Hình thức bảo hành</span>
              <span>Phiếu bảo hành</span>
            </div>
          </div>
          <div class="warranty_where">
            <span>Nơi bảo hành</span>
            <span>bảo hành chính hãng</span>
          </div>
          <div class="warranty_instruction">
            <span>Hướng dẫn bảo hành</span>
            <span>
              <a href="" class="text-primary">
                Xem chi tiết
              </a>
            </span>
          </div>
        </div>
      </div>
      <div class="asure_warranty d-flex">
        <div class="asure_1">
          <img
            src="https://salt.tikicdn.com/ts/upload/2c/48/44/720434869e103b03aaaf1a104d91ad25.png"
            alt=""
          />
          <span>Hoàn tiền 111% nếu hàng giả</span>
        </div>
        <div class="asure_2">
          <img
            src="https://salt.tikicdn.com/ts/upload/4b/a1/23/1606089d5423e5cba05e3820ad39708e.png"
            alt=""
          />
          <span>Mở hộp kiểm tra nhận hàng</span>
        </div>
        <div class="asure_3">
          <img
            src="https://salt.tikicdn.com/ts/upload/63/75/6a/144ada409519d72e2978ad2c61bc02a7.png"
            alt=""
          />
          <span>Đổi trả trong 30 ngày nếu sản phẩm lỗi</span>
        </div>
      </div>
    </>
  );
};
export default Seller;
