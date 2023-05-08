import React, { useContext, useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import LoadingSpinner from '../LoadingSpinner';
import API, { authAPI, endpoints } from '../../configs/API';
import cookie from "react-cookies"
import { MyUserContext } from '../../configs/MyContext';
import { Navigate } from 'react-router-dom';
import setErr from '../../layouts/Error';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
function LoginSeller() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [user, dispatch] = useContext(MyUserContext)
  var format = /^[!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  const login = (evt) => {
    evt.preventDefault()
    const process = async () => {
      try {
        let res = await API.post(endpoints['login'], {
          "username": username,
          "password": password,
          "client_id": "P1DzxRpaj9KeFVfjtYKt6r6vuUC1fpi0D39Tdv2n",
          "client_secret": "AiL1nBbTLTVecQL5PTbCuHRuLKZN6qQgo9K0TblulO1VgFfeoSl7jL1tqEMuBy9q7BHUWsMOSlFTGeHkJ1kXdhiGo4pqSstIg2La0jgiZs1osutn4Qy0G8mwi6Q03tvD",
          "grant_type": "password"
        })

        cookie.save('access-token', res.data.access_token)

        let user = await authAPI().get(endpoints['current-seller'])
        if (user.data.is_seller === true || user.data.provider === null) {
          cookie.save('current-user', user.data)

          dispatch({
            "type": "login",
            "payload": user.data
          })

        } else {
          dispatch({
            type: "logout",
          });
          setErr("không tìm thấy tài khoản!")
          user = null;
        }
      } catch (ex) {
        alert(ex)
        console.error(ex)
        setErr('Username hoặc Password không hợp lệ!')
      } finally {
        setLoading(false)
      }
    }

    if (username === "" || password === "")
      setErr("Phải nhập username và password!")
    else if (username.indexOf('@') == -1 || username.indexOf(' ') >= 0 || username.match(format)) {
      setErr("vui lòng nhập username là email , không chứa khoảng trắng và kí tự đặc biệt!")
    }
    else {
      setLoading(true)
      process()
    }
  }
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '76223967305-r9itrvl9fhsgkkvbgo8hbdglt65a7kn8.apps.googleusercontent.com',
        scope: ""
      })
    }
    gapi.load('client:auth2', start);

  })
  const onSuccess = (resGoogle) => {
    console.log(resGoogle)
    const process = async (obj) => {
      alert(obj.email)
      setLoading(true)

      let res = await API.post(endpoints['login'], {
        "username": obj.email,
        "password": "1951012031z",
        "client_id": "P1DzxRpaj9KeFVfjtYKt6r6vuUC1fpi0D39Tdv2n",
        "client_secret": "AiL1nBbTLTVecQL5PTbCuHRuLKZN6qQgo9K0TblulO1VgFfeoSl7jL1tqEMuBy9q7BHUWsMOSlFTGeHkJ1kXdhiGo4pqSstIg2La0jgiZs1osutn4Qy0G8mwi6Q03tvD",
        "grant_type": "password"
      })

      cookie.save('access-token', res.data.access_token)

      let user = await authAPI().get(endpoints['current-customer'])
      if (user.data.is_seller === true || user.data.provider === 'Google') {
        cookie.save('current-user', user.data)

        dispatch({
          "type": "login",
          "payload": user.data
        })

      } else {
        dispatch({
          type: "logout",
        });
        setErr("không tìm thấy tài khoản bán hàng!")
        user = null;
      }

    }
    const registerGoogleUser = async (obj) => {
      try {
        const form = new FormData();
        form.append("first_name", obj.familyName);
        form.append("last_name", obj.givenName);
        form.append("username", obj.email);
        form.append("email", obj.email);
        form.append("password", "1951012031z");
        form.append("is_customer", false);
        form.append("is_seller", true);
        form.append("image", obj.imageUrl);
        form.append("provider", "Google");

        let res = await API.post(endpoints["register-customer"], form, {
          headers: {
            'content-type': 'multipart/form-data',

          }
        });
        if (res.status === 201) {
          alert('register sucessfully')
          process(obj);
        }
        else setErr("there is a error, please turn back a few minute!");
      } catch (ex) {

        let msg = "";
        for (let e of Object.values(ex.response.data)) msg += `${e} `;

        setErr(msg);
        // setLoading(false)
      } finally {
        setLoading(false);
      }
    }

    try {
      setLoading(true)
      process(resGoogle.profileObj)
    } catch (error) {
      alert("khong co tai khoan")
      // registerGoogleUser(resGoogle.profileObj);
    } finally {
      setLoading(false)
      alert("hehe")
      registerGoogleUser(resGoogle.profileObj);
      process(resGoogle.profileObj)
    }
  }
  const onFailure = (res) => {
    console.log(res);
  }
  const onLogoutSuccess = (res) => {
    console.log(res);
  }
  const responseFacebook = (res) => {
    console.log(res);
  }
  var renderErr = (
    <>
      <div className="text-danger" style={{ marginTop: '-20px' }}>{err}</div>
    </>
  )
  if (err == '') {
    renderErr = (
      <>
        <div className="d-none text-danger">{err}</div>
      </>
    )
  }

  if (user !== null)
    return <Navigate to="/" />
  const renderLoginSeller = (
    <>
      <MDBContainer fluid className="p-3 my-5">
        <h1 className='mb-5' style={{ marginLeft: '50.5%', color: 'rgb(85, 172, 238)' }}>Login for Seller</h1>
        <MDBRow>

          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
          </MDBCol>

          <MDBCol col='4' md='6'>


            <Form onSubmit={login}>
              <MDBInput wrapperClass='mb-4' onChange={e => setUsername(e.target.value)} label='Email address' id='formControlLg' type='text' size="lg" />
              <MDBInput wrapperClass='mb-4' onChange={e => setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg" />

              {renderErr}
              <div className="d-flex justify-content-between mt-5 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn type='submit' className="mb-4 w-100" size="lg">Sign in</MDBBtn>
            </Form>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn
              tag="a"
              color="none"
              className="mb-4 w-100"
              style={{ color: "#1266f1" }}
            >
              <GoogleLogin
                clientId="76223967305-r9itrvl9fhsgkkvbgo8hbdglt65a7kn8.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
            </MDBBtn>

            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#ccc' }}>
              <MDBIcon fab icon="google" className="mx-2" />
              Continue with Google
            </MDBBtn>

          </MDBCol>

        </MDBRow>

      </MDBContainer>
    </>
  )
  return (
    <>
      {loading ? <LoadingSpinner /> : renderLoginSeller}
    </>
  );
}

export default LoginSeller;