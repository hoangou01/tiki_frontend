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

const SellerInfo = () => {
  //   const [seller, setSeller] = useEffect([]);
  //   useEffect(() => {
  //     const loadSeller = async () => {
  //       let res = await API.get(endpoints["sellers"]);
  //       setSeller(res.data);
  //     };

  //     loadSeller();
  //   }, []);
  return (
    <>
      <Container>
        <div className="seller_info">
          <Row>
            <Col md={12}>
              <div className="info d-flex">
                <ul className="info_left">
                  <li className="d-flex">
                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/time-new.svg" />
                    <span>Thành viên từ năm</span>
                  </li>
                  <li className="d-flex">
                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/product-new.svg" />
                    <span>Sản phẩm</span>
                  </li>
                  <li className="d-flex">
                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/bio-new.svg" />
                    <span>Mô tả cửa hàng</span>
                  </li>
                  <li className="d-flex">
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_637_52320)"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 9.375C2.5 5.79304 5.96588 3.125 10 3.125C14.0341 3.125 17.5 5.79304 17.5 9.375C17.5 10.8451 16.8749 12.164 15.9046 13.2202L16.2459 16.1784C16.2712 16.3977 16.1789 16.6141 16.0031 16.7477C15.8273 16.8812 15.594 16.9121 15.3895 16.8289L11.8998 15.4094C11.2727 15.572 10.651 15.625 10 15.625C5.96588 15.625 2.5 12.957 2.5 9.375ZM10 4.375C6.40912 4.375 3.75 6.70696 3.75 9.375C3.75 12.043 6.40912 14.375 10 14.375C10.6489 14.375 11.2092 14.316 11.7579 14.1514C11.8945 14.1104 12.0409 14.1173 12.173 14.1711L14.8832 15.2735L14.6291 13.0716C14.6072 12.8821 14.6731 12.693 14.8081 12.5581C15.7174 11.6487 16.25 10.5501 16.25 9.375C16.25 6.70696 13.5909 4.375 10 4.375Z" fill="#808089"></path></g><defs><clipPath id="clip0_637_52320"><rect width="15" height="15" fill="white" transform="translate(2.5 2.5)"></rect></clipPath></defs></svg>
                    </span>
                    <span>Phản hồi chat</span>
                  </li>
                </ul>
                <ul className="info_right">
                  <li>2017</li>
                  <li>2000+</li>
                  <li>
                    Mua online sản phẩm của cửa hàng Tiki Trading trên Tiki.vn.
                    ✓ chất lượng cao, uy tín, giá tốt ✓ Chính hãng ✓ Giao hàng
                    toàn quốc
                  </li>
                  <li>Chưa có</li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default SellerInfo;
