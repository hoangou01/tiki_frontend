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
import SellerNav from "../components/sellerPage/SellerNav";
import ProductSeller from "../components/sellerPage/ProductSeller";
import SellerInfo from "../components/sellerPage/SellerInfo";
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
