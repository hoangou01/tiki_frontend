import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderDetail = () => {
  const renderOrderDetail = (
    <>
      <div className="order_info">
        <section className="vh-50">
          <MDBContainer className="py-5 h-100">
            <MDBRow className="align-items-center h-100">
              <h5>Thông tin đơn hàng #3 - Giao hàng thành công</h5>
              <Col md={4}>
                <div className="customer_address">
                    <h5>ĐỊA CHỈ NGƯỜI NHẬN</h5>
                    <div className="content d-flex flex-column">
                        <span className="customer_name">PHẠM MINH HOÀNG</span>
                        <span className="customer_address">Địa chỉ: 229/76/16 Tây Thạnh Phường Tây Thạnh Quận Tân Phú, Phường Tây Thạnh, Quận Tân Phú, Hồ Chí Minh, Việt Nam</span>
                        <span className="customer_phone">Điện thoại: 0942515210</span>

                    </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="customer_type_ship">
                    <h5>HÌNH THỨC GIAO HÀNG</h5>
                    <div className="content d-flex flex-column">

                    </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="customer_type_payment">
                    <h5>HÌNH THỨC THANH TOÁN</h5>
                    <div className="content d-flex flex-column">

                    </div>
                </div>
              </Col>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </>
  );
  return <>{renderOrderDetail}</>;
};
export default OrderDetail;
