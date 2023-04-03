import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Container, Form, Row, Col } from "react-bootstrap";

function SellerNav() {
  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            <div className="seller_nav">
              <div className="seller_info">
                <div className="d-flex">
                  <div className="seller_img">
                    <img src="https://salt.tikicdn.com/cache/w220/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png" />
                  </div>
                  <div className="seller_name">
                    <h5>Tiki Trading</h5>
                    <img
                      className="is_official"
                      src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                    />
                  </div>
                  <div className="seller_description">
                    <p className="">
                      Mua online sản phẩm của cửa hàng Tiki Trading trên
                      Tiki.vn. ✓ chất lượng cao, uy tín, giá tốt ✓ Chính hãng ✓
                      Giao hàng toàn quốc
                    </p>
                  </div>
                </div>
              </div>
              <div className="seller_list_link">
                <ul>
                  <li>
                    <a href="">Tất cả sản phẩm</a>
                  </li>
                  <li>
                    <a href="">Hồ sơ của hàng</a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SellerNav;
