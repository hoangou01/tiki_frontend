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
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import API, { authAPI, endpoints } from "../../configs/API";
import LoadingSpinner from "../LoadingSpinner";
import { useContext } from "react";
import { MyUserContext } from "../../configs/MyContext";
import { useEffect } from "react";

const CustomerOrder = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const [order, setOrder] = useState([]);
  const [orderItem , setOrderItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const {customerId} = useParams();
  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      try {
        var res = await authAPI().get(endpoints["customer-orders"](customerId));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setOrder(res.data);
    };
    loadOrder();
  }, [])
  useEffect(() => {
    const loadOrderItems = async () => {
      setLoading(true);
      try {
        var res = await API.get(endpoints["order-items"](order.id));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setOrderItem(...orderItem,res.data);
    };
    loadOrderItems();
  }, [order.id])
  console.log(orderItem)
  const renderListOrder = (
    <>
      <section className="vh-50">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="align-items-center h-100">
            <div className="list_order">
              <h5>Danh sách đơn hàng</h5>
              <MDBCol lg="12" className="mb-4 mb-lg-0">
                <hr></hr>

                {order.map(o=>(
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
                        {o.order_item.product.name}
                          {/* Combo 5 GIỎ SẮT Treo Chậu Hoa Ban Công Hình Tròn - Màu
                          Đen */}
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
                ))}

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
