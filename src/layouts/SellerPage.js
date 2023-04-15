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
function SellerPage() {
  return (
    <>
        <div className="sellerpage">
            <SellerNav/>
            <SellerInfo/>
        </div>
    </>
  );
}

export default SellerPage;
