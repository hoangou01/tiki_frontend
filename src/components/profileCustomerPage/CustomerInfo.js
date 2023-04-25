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
import LoadingSpinner from "../LoadingSpinner";
import { Form } from "react-bootstrap";
import { authAPI, endpoints } from "../../configs/API";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { MyUserContext } from "../../configs/MyContext";
import { useState } from "react";
const CustomerInfo = () => {
    const [customer, setCustomer] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyUserContext);
    const {customerId} = useParams();
    
    // useEffect(() => {
    //   const loadCustomer = async () => {
    //     setLoading(true);
    //     try {
    //       var res = await authAPI().get(endpoints["customer-detail"](customerId));
    //     } catch (error) {
    //       setLoading(false);
    //     }
    //     setLoading(false);
    //     setCustomer(res.data);
    //   };

    //   loadCustomer();
    // }, []);
    console.log(user)
  const renderProfileCustomer = (
    <>
      <section className="vh-50">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="align-items-center h-100">
            <MDBCol lg="12" className="mb-4 mb-lg-0">
              <Form>
                <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                  <MDBRow className="g-0">
                    <MDBCol
                      md="2"
                      className="gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                      }}
                    >
                      <MDBCardImage
                        src={`http://127.0.0.1:8000/static/`+user.image}
                        alt="Avatar"
                        className="my-5"
                        style={{ width: "80px" }}
                        fluid
                      />
                      <MDBTypography tag="h5">{user.username}</MDBTypography>
                      <MDBCardText>Web Designer</MDBCardText>
                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="10">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="3" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">
                            {user.username}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="3" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">
                            {user.phone? user.phone: 'không có'}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="3" className="mb-3">
                            <MDBTypography tag="h6">Gender</MDBTypography>
                            <MDBCardText className="text-muted">
                            {user.gender? user.gender: 'không có'}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="3" className="mb-3">
                            <MDBTypography tag="h6">Day of birth</MDBTypography>
                            <MDBCardText className="text-muted">
                            {user.DOB? user.DOB: 'không có'}

                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>

                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="12" className="mb-3">
                            <MDBTypography tag="h6">Address</MDBTypography>
                            <MDBCardText className="text-muted">
                            {user.address? user.address: 'không có'}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>

                        <div className="d-flex justify-content-start">
                          <a href="#!">
                            <MDBIcon fab icon="facebook me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="twitter me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="instagram me-3" size="lg" />
                          </a>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </Form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
  return <>{renderProfileCustomer}</>;
};
export default CustomerInfo;
