import { useState } from "react"
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import API, { endpoints } from "../configs/API";
import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Numeral } from "react-numeral";
const Order = () => {
    const [orderItem, setOrderItems] = useState([])
    const [order, setOrder] = useState([])
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const { orderId } = useParams();
    const nav = useNavigate()
    useEffect(() => {
        const loadOrderItem = async () => {
            setLoading(true);
            try {
                var res = await API.get(endpoints["order-items"](orderId));
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
            setOrderItems(res.data);
        };


        loadOrderItem();
        setProduct(orderItem.product)

    }, []);
    useEffect(() => {
        const loadOrder = async () => {
            setLoading(true);
            try {
                var res = await API.get(endpoints["order-detail"](orderId));
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
            setOrder(res.data);
        };
        loadOrder();
    }, [])
    const handlePayment = (e) => {
        e.preventDefault();
        alert("1")
        const updateStatus = async () => {
            try {
                let res = await API.post(endpoints['update-order'](orderId), {
                    'status': 'đã thanh toán',
                })
                if (res.status = 201) {
                    alert("thanh toán thành công")
                    nav(`/`);
                } else {
                    alert("thanh toán không thành công!");
                }
            } catch (error) {
                alert('thanh toán không thành công!')
            } finally {
                setLoading(false);
            }
        }
        setLoading(true)
        updateStatus();
    }
    return (
        <>
            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol>
                            <MDBCard>
                                <MDBCardBody className="p-4">
                                    <MDBRow>
                                        <MDBCol lg="7">
                                            <MDBTypography tag="h5">
                                                <Link to={`/`} className="text-body">
                                                    <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                                                    shopping
                                                </Link>
                                            </MDBTypography>

                                            <hr />

                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p className="mb-1">Shopping cart</p>
                                                    <p className="mb-0">You have {order.total_order_items} items in your cart</p>
                                                </div>
                                                <div>
                                                    <p>
                                                        <span className="text-muted">Sort by:</span>
                                                        <a href="#!" className="text-body">
                                                            price
                                                            <MDBIcon fas icon="angle-down mt-1" />
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            {orderItem.map(p => (

                                                <MDBCard className="mb-3">
                                                    <MDBCardBody>
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div>
                                                                    <MDBCardImage
                                                                        src={p.product.image.startsWith('http') ? p.product.image : 'http://127.0.0.1:8000/' + p.product.image}
                                                                        fluid className="rounded-3" style={{ width: "65px" }}
                                                                        alt="Shopping item" />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <MDBTypography tag="h5">
                                                                        {p.product.name}
                                                                    </MDBTypography>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div style={{ width: "50px" }}>
                                                                    <MDBTypography tag="h5" className="fw-normal mb-0">
                                                                        {p.quantity}
                                                                    </MDBTypography>
                                                                </div>
                                                                <div style={{ width: "80px" }}>
                                                                    <MDBTypography tag="h5" className="mb-0">
                                                                        <Numeral
                                                                            value={p.product.price_discount}
                                                                            format={"0,0"}
                                                                        />đ
                                                                    </MDBTypography>
                                                                </div>
                                                                <a href="#!" style={{ color: "#cecece" }}>
                                                                    <MDBIcon fas icon="trash-alt" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            ))}


                                        </MDBCol>

                                        <MDBCol lg="5">
                                            <MDBCard className="bg-primary text-white rounded-3">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <MDBTypography tag="h5" className="mb-0">
                                                            Card details
                                                        </MDBTypography>
                                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                            fluid className="rounded-3" style={{ width: "45px" }} alt="Avatar" />
                                                    </div>

                                                    <p className="small">Card type</p>
                                                    <a href="#!" type="submit" className="text-white">
                                                        <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                                                    </a>
                                                    <a href="#!" type="submit" className="text-white">
                                                        <MDBIcon fab icon="cc-visa fa-2x me-2" />
                                                    </a>
                                                    <a href="#!" type="submit" className="text-white">
                                                        <MDBIcon fab icon="cc-amex fa-2x me-2" />
                                                    </a>
                                                    <a href="#!" type="submit" className="text-white">
                                                        <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                                                    </a>

                                                    <form className="mt-4">
                                                        <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
                                                            placeholder="Cardholder's Name" contrast />

                                                        <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
                                                            minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

                                                        <MDBRow className="mb-4">
                                                            <MDBCol md="6">
                                                                <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
                                                                    minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                                                            </MDBCol>
                                                            <MDBCol md="6">
                                                                <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
                                                                    maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </form>

                                                    <hr />

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Subtotal</p>
                                                        <p className="mb-2">{order.total}đ</p>
                                                    </div>

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Shipping</p>
                                                        <p className="mb-2">{order.price_shipping}đ</p>
                                                    </div>

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Total(Incl. taxes)</p>
                                                        <p className="mb-2">{order.total ? (order.total + order.price_shipping) : order.price_shipping}đ</p>
                                                    </div>

                                                    <MDBBtn onClick={handlePayment} color="info" block size="lg">
                                                        <div className="d-flex justify-content-between">
                                                            <span>{order.total ? (order.total + order.price_shipping) : order.price_shipping}đ</span>
                                                            <span>
                                                                Checkout{" "}
                                                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                                            </span>
                                                        </div>
                                                    </MDBBtn>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    )
}
export default Order