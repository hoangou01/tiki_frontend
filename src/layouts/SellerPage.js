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
import { Container, Form } from "react-bootstrap";
import SellerNav from "../components/sellerpage/SellerNav";
import ProductSeller from "../components/sellerpage/ProductSeller";
import SellerInfo from "../components/sellerpage/SellerInfo";
import { Outlet } from "react-router-dom";
function SellerPage() {
  return (
    <>
        <div className="sellerpage">
            <SellerNav/>
            <Outlet/>
        </div>
    </>
  );
}

export default SellerPage;
