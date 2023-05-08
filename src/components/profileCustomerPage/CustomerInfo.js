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
import API, { authAPI, endpoints } from "../../configs/API";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { MyUserContext } from "../../configs/MyContext";
import { useState } from "react";
import InputItem from "../../layouts/InputItem";
const CustomerInfo = () => {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, dispatch] = useContext(MyUserContext);
  const { customerId } = useParams();
  const [userUpdate, setUserUpdate] = useState({
    DOB: user.DOB ? user.DOB : '',
    gender: user.gender ? user.gender : '',
    address: user.address ? user.address : '',
    phone: user.phone ? user.phone : ''

  })
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
  const setValue = (e) => {
    const { name, value } = e.target;
    setUserUpdate((current) => ({ ...current, [name]: value }));
  };
  const updateUser = () => {
    const process = async () => {
      let res = await authAPI().post(endpoints['update-user'](customerId), {
        // 'image':obj.imageUrl,
        // 'first_name':obj.familyName,
        // 'last_name':obj.givenName
      })
    }
  }
  const renderProfileCustomer = (
    <>
      <section className="vh-50">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="align-items-center h-100">
            <MDBCol lg="12" className="mb-4 mb-lg-0">
              <Form onSubmit={updateUser}>
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
                        src={user.image.startsWith('http') ? user.image : 'http://127.0.0.1:8000/' + user.image}
                        alt="Avatar"
                        className="my-5 rounded-circle"
                        style={{ width: "80px" }}
                        fluid
                      />
                      <MDBTypography tag="h5">{user.username}</MDBTypography>
                      <MDBCardText>Web Designer</MDBCardText>
                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="10">
                      <Form/>
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
