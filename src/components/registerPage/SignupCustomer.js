import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { endpoints } from "../../configs/API";
import setErr from "../../layouts/Error";
import LoadingSpinner from "../LoadingSpinner";
import InputItem from "../../layouts/InputItem";
import axios, { Axios } from "axios";
function SignupCustomer() {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email:"",
    gender:"",
    password: "",
    phone: "",
    confirmPassword: "",
    is_customer: true,
    is_seller: false,
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("");
  const url = "";
  const nav = useNavigate();
  var format = /^[!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  const register = (evt) => {
    evt.preventDefault();

    const handleUpload = async() => {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("upload_preset", "qqvyn34x");
      formData.append("cloud_name","hm-findingjob")
      await axios.post(
        "https://api.cloudinary.com/v1_1/hm-findingjob/image/upload",
        formData
      ).then((response) => {
          let url = (response.data.secure_url).toString()
          process(url);
        })
        .catch((error) => {
          alert(error);
          setErr(error);
          
        });
    };

    const process = async (url) => {
      alert(customer.firstName + customer.lastName + url);
      try {
        
        let form = new FormData();
        form.append("first_name", customer.firstName);
        form.append("last_name", customer.lastName);
        form.append("username", customer.username);
        form.append("email", customer.username);
        form.append("password", customer.password);
        form.append("phone", customer.phone);
        form.append("is_customer", customer.is_customer);
        form.append("is_seller", customer.is_seller);
        form.append("image", url);
        
        // alert(customer.firstName + customer.lastName + customer.username+customer.phone+ customer.is_customer)
        // if (image.current.files.length > 0)
        //   form.append("image", image.current.files[0]);

        let res = await API.post(endpoints["register-customer"], form, {
          headers: {
            'content-type': 'multipart/form-data',
          
          }
        });
        if (res.status === 201) nav("/login/customer");
        else setErr("there is a error, please turn back a few minute!");
      } catch (ex) {
        
        let msg = "";
        for (let e of Object.values(ex.response.data)) msg += `${e} `;

        setErr(msg);
        // setLoading(false)
      } finally {
        setLoading(false);
      }
    };

    if (customer.username === "" || customer.password === "")
      setErr("Username and password is not allow null");
    else if (customer.username.indexOf("@") == -1) {
      setErr("please imput email correctly");
    } else if (
      customer.username.indexOf(" ") >= 0 ||
      customer.username.match(format)
    ) {
      setErr("please username is not include space and special characters!");
    } else if (customer.password !== customer.confirmPassword) {
      setErr("password is not match!");
      alert("1");
    } else {
      setLoading(true);
      handleUpload();
      
    }
  };

  const setValue = (e) => {
    const { name, value } = e.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };
  var renderErr = (
    <>
      <div className="text-danger ps-5 mb-5" style={{ marginTop: "-20px" }}>
        {err}
      </div>
    </>
  );
  if (err == "") {
    renderErr = (
      <>
        <div className="d-none text-danger">{err}</div>
      </>
    );
  }
  const renderRegisterCustomer = (
    <>
      <MDBContainer fluid>
        <div
          className="p-5 bg-image"
          style={{
            backgroundImage:
              "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
            height: "300px",
          }}
        ></div>

        <MDBCard
          className="mx-5 mb-5 p-5 shadow-5"
          style={{
            marginTop: "-100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}
        >
          <MDBCardBody className="p-5 text-center">
            <h2 className="fw-bold mb-5">Sign up now for customer</h2>

            <Form onSubmit={register}>
              <MDBRow>
                <MDBCol col="6">
                  <InputItem
                    wrapperClass="mb-4"
                    label="First name"
                    id="form1"
                    name="firstName"
                    value={customer.firstName}
                    setValue={setValue}
                    type="text"
                  />
                </MDBCol>

                <MDBCol col="6">
                  <InputItem
                    wrapperClass="mb-4"
                    label="Last name"
                    id="form1"
                    name="lastName"
                    setValue={setValue}
                    value={customer.lastName}
                    type="text"
                  />
                </MDBCol>
              </MDBRow>
              <InputItem
                wrapperClass="mb-4"
                label="Phone"
                id="form1"
                value={customer.phone}
                setValue={setValue}
                name="phone"
                type="text"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
              <InputItem
                wrapperClass="mb-4"
                label="Email"
                id="form1"
                value={customer.username}
                setValue={setValue}
                name="username"
                type="text"
              />
              <Form.Select onChange={setValue} name="gender" wrapperClass="mb-4">
                  <option value={"Nam"}>Nam</option>
                  <option value={"Nữ"}>Nữ</option>
              </Form.Select>
              <br></br>
              <InputItem
                wrapperClass="mb-4"
                label="Password"
                id="form1"
                value={customer.password}
                setValue={setValue}
                name="password"
                type="password"
              />
              <InputItem
                wrapperClass="mb-4"
                label="comfirm password"
                id="form1"
                value={customer.confirmPassword}
                setValue={setValue}
                name="confirmPassword"
                type="password"
              />
              <input
                type="file"
                onChange={(event) => {
                  setUploadFile(event.target.files[0]);
                }}
              />
              <img src={cloudinaryImage} />
              {/* {err ? (
                  <>
                    <div
                      className="text-danger float-start mt-1"
                      style={{ marginTop: "-20px" }}
                    >
                      {err}
                    </div>
                  </>
                ) : (
                  ""
                )} */}
              {renderErr}

              <Button className="w-100 mb-4 mt-5" type="submit" size="md">
                sign up
              </Button>
            </Form>

            <div className="text-center">
              <p>or sign up with:</p>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "#1266f1" }}
              >
              <Link to={`https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=257258138400-mr529ithjfvis5j7pglojak1m18b1vr4.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&scope=profile&response_type=code&state=hjlX3CkGmUKI&service=lso&o2v=2&flowName=GeneralOAuthFlow`}>
                <MDBIcon  fab icon="google" size="sm" />

              </Link>
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
  return <>{loading ? <LoadingSpinner /> : renderRegisterCustomer}</>;
}

export default SignupCustomer;