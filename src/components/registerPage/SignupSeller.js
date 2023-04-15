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
import { Button, Form } from "react-bootstrap";
import InputItem from "../../layouts/InputItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { endpoints } from "../../configs/API";
import { useRef } from "react";
import setErr from "../../layouts/Error";
function SignupSeller() {
  const [seller, setSeller] = useState({
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
    evt.preventDefault();

    const process = async () => {
      try {
        let form = new FormData();
        form.append("first_name", seller.firstName);
        form.append("last_name", seller.lastName);
        form.append("username", seller.username);
        form.append("password", seller.password);
        form.append("phone", seller.phone);
        form.append("is_customer", false);
        form.append("is_seller", true);
        if (avatar.current.files.length > 0)
          form.append("avatar", avatar.current.files[0]);

        let res = await API.post(endpoints["register-seller"], form, {
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

    if (seller.username === "" || seller.password === "") {
      setErr("Username and password is not allow null");
    } else if (seller.username.indexOf("@") === -1) {
      setErr("please imput email correctly");
    } else if (
      seller.username.indexOf(" ") >= 0 ||
      seller.username.match(format)
    ) {
      setErr("please username is not include space and special characters!");
    } else if (seller.password !== seller.confirmPassword)
      setErr("password is not match!");
    else {
      setLoading(true);
      process();
    }
  };

  const setValue = (e) => {
    const { name, value } = e.target;
    setSeller((current) => ({ ...current, [name]: value }));
  };
  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Let register <br />
            <span className="text-primary">for your shop</span>
          </h1>

          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
              <Form onSubmit={register}>
                <MDBRow>
                  <MDBCol col="6">
                    <InputItem
                      wrapperClass="mb-4"
                      label="First name"
                      name="firstName"
                      value={seller.firstName}
                      setValue={setValue}
                      id="form1"
                      type="text"
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <InputItem
                      wrapperClass="mb-4"
                      label="Last name"
                      name="lastName"
                      value={seller.lastname}
                      setValue={setValue}
                      id="form1"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>

                <InputItem
                  wrapperClass="mb-4"
                  label="Email"
                  value={seller.username}
                  setValue={setValue}
                  name="username"
                  id="form1"
                  type="text"
                />
                <InputItem
                  wrapperClass="mb-4"
                  label="Password"
                  value={seller.password}
                  setValue={setValue}
                  name="password"
                  id="form1"
                  type="password"
                />
                {err?
                  <>
          <div className="text-danger" style={{ marginTop: '-20px' }}>{err}</div>
        </>
                :""}
                {/* {err != ""?<><setErr err={err}/></>:""} */}

                <Button className="w-100 mb-4" type="submit" size="md">
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
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignupSeller;
