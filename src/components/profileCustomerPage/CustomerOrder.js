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
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomerOrder = () => {
  const renderListOrder = (
    <>
      <section className="vh-50">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="align-items-center h-100">
            <div className="list_order">
              <h5>Danh sách đơn hàng</h5>
              <MDBCol lg="12" className="mb-4 mb-lg-0">
                <hr></hr>

                <Link to={`/customers/${1}/orders/${1}`} className="text-dark">
                  <div className="order_item">
                    <div className="d-flex">
                      <div className="left">
                        <img
                          src="https://salt.tikicdn.com/cache/200x200/ts/product/c4/4b/8f/a173964e0a29bc31f1cdd080ad4675bd.jpg"
                          className="img_product"
                        />
                      </div>
                      <div className="right d-flex flex-column">
                        <h5 className="order_item_name">
                          Combo 5 GIỎ SẮT Treo Chậu Hoa Ban Công Hình Tròn - Màu
                          Đen
                        </h5>
                        <div className="d-flex price">
                          <span>
                            Đơn giá:{" "}
                            <span className="text-secondary">23.000</span>
                          </span>
                          <span>
                            số lượng: <span className="text-secondary">3</span>{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                
              </MDBCol>
            </div>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
  return <>{renderListOrder}</>;
};
export default CustomerOrder;
