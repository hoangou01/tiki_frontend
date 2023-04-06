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
const CustomerInfo = () => {
  //   const [customer, setCustomer] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   useEffect(() => {
  //     const loadCustomer = async () => {
  //       setIsLoading(true);
  //       try {
  //         var res = await API.get(endpoints["customer-detail"(customerId)]);
  //       } catch (error) {
  //         setIsLoading(false);
  //       }
  //       setIsLoading(false);
  //       setCustomer(res.data);
  //     };

  //     loadCustomer();
  //   }, []);
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
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="Avatar"
                        className="my-5"
                        style={{ width: "80px" }}
                        fluid
                      />
                      <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
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
                              hoangou@gmail.com
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="3" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">
                              123 456 789
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="3" className="mb-3">
                            <MDBTypography tag="h6">Gender</MDBTypography>
                            <MDBCardText className="text-muted">
                              Nam
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="3" className="mb-3">
                            <MDBTypography tag="h6">Day of birth</MDBTypography>
                            <MDBCardText className="text-muted">
                              01/12/2001
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>

                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="12" className="mb-3">
                            <MDBTypography tag="h6">Address</MDBTypography>
                            <MDBCardText className="text-muted">
                              229/76/16 Tây Thạnh , tphcm
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
