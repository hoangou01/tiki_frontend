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
import { useNavigate } from "react-router-dom";
import API, { endpoints } from "../../configs/API";
import setErr from "../../layouts/Error";
import LoadingSpinner from "../LoadingSpinner";
import InputItem from "../../layouts/InputItem";
function SignupCustomer() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });
  const avatar = useRef();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();
  var format = /^[!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  const register = (evt) => {
    console.log(user);
    evt.preventDefault();

    const process = async () => {
      try {
        let form = new FormData();
        form.append("first_name", user.firstName);
        form.append("last_name", user.lastName);
        form.append("username", user.username);
        form.append("password", user.password);
        form.append("phone", user.phone);
        form.append("is_customer", true);
        form.append("is_seller", false);
        if (avatar.current.files.length > 0)
          form.append("avatar", avatar.current.files[0]);

        let res = await API.post(endpoints["register-customer"], form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 201) nav("/login/customer");
        else setErr("there is a error, please turn back a few minute!");
      } catch (ex) {
        let msg = "";
        for (let e of Object.values(ex.response.data)) msg += `${e} `;

        setErr(msg);
      } finally {
        setLoading(false);
      }
    };

    if (user.username === "" || user.password === "")
      setErr("Username and password is not allow null");
    else if (user.username.indexOf("@") == -1) {
      setErr("please imput email correctly");
    } else if (user.username.indexOf(" ") >= 0 || user.username.match(format)) {
      setErr("please username is not include space and special characters!");
    } else if (user.password !== user.confirmPassword) {
      setErr("password is not match!");
      alert("ahah");
    } else {
      setLoading(true);
      alert("ahah");
      process();
    }
  };

  const setValue = (e) => {
    const { name, value } = e.target;
    setUser((current) => ({ ...current, [name]: value }));
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
                    value={user.firstName}
                    setValue={setValue}
                    type="text"
                  />
                </MDBCol>

                <MDBCol col="6">
                  <InputItem
                    wrapperClass="mb-4"
                    label="Last name"
                    id="form1"
                    setValue={setValue}
                    value={user.lastName}
                    name="lastName"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>
              <InputItem
                wrapperClass="mb-4"
                label="Phone"
                id="form1"
                value={user.phone}
                setValue={setValue}
                name="phone"
                type="text"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
              <InputItem
                wrapperClass="mb-4"
                label="Email"
                id="form1"
                value={user.username}
                setValue={setValue}
                name="username"
                type="text"
              />
              <InputItem
                wrapperClass="mb-4"
                label="Password"
                id="form1"
                value={user.password}
                setValue={setValue}
                name="password"
                type="password"
              />
              <InputItem
                wrapperClass="mb-4"
                label="comfirm password"
                id="form1"
                value={user.confirmPassword}
                setValue={setValue}
                name="confirmPassword"
                type="password"
              />
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
                <MDBIcon fab icon="google" size="sm" />
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
  return (<>{loading ? <LoadingSpinner /> : renderRegisterCustomer}</>);
}

export default SignupCustomer;
