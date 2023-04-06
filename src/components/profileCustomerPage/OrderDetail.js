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
                    <span className="customer_address">
                      Địa chỉ: 229/76/16 Tây Thạnh Phường Tây Thạnh Quận Tân
                      Phú, Phường Tây Thạnh, Quận Tân Phú, Hồ Chí Minh, Việt Nam
                    </span>
                    <span className="customer_phone">
                      Điện thoại: 0942515210
                    </span>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="customer_type_ship">
                  <h5>HÌNH THỨC GIAO HÀNG</h5>
                  <div className="content d-flex flex-column">
                    <span>Giao hàng tiết kiệm</span>
                    <span>Giao vào Thứ năm, 24/09</span>
                    <span>Được giao bởi Thiết bị vệ sinh VN</span>
                    <span>Phí vận chuyển: 49.000đ</span>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="customer_type_payment">
                  <h5>HÌNH THỨC THANH TOÁN</h5>
                  <div className="content d-flex flex-column">
                    <span>Thanh toán khi nhận tiền mặt</span>
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <table className="list_products">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>giá</th>
                      <th>số lượng</th>
                      <th>giảm giá</th>
                      <th>tạm tính</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="product_item d-flex">
                          <img src="https://salt.tikicdn.com/cache/200x200/ts/product/c4/4b/8f/a173964e0a29bc31f1cdd080ad4675bd.jpg"></img>
                          <div className="product_info">
                            <p>Combo 5 GIỎ SẮT Treo Chậu Hoa Ban Công Hình Tròn - Màu Đen</p>
                            <p className="product_sku">sku: 8967681318461</p>

                          </div>
                        </div>
                      </td>
                      <td>
                        23.000
                      </td>
                      <td>1</td>
                      <td>0đ</td>
                      <td>23.000</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4}>
                        <span>Tạm tính</span>
                      </td>
                      <td>
                        23.000
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <span>Phí vận chuyển</span>
                      </td>
                      <td>
                        49.000
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <span>Tổng cộng</span>
                      </td>
                      <td>
                        <span className="text-danger">72.000</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
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
