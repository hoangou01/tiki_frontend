import React, { useContext, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { Button, Form } from 'react-bootstrap';
import cookie from "react-cookies"
import LoadingSpinner from '../LoadingSpinner';
import { MyUserContext } from '../../configs/MyContext';
import API, { endpoints, authAPI } from '../../configs/API';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
const LoginCustomer = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [user, dispatch] = useContext(MyUserContext)
  const nav = useNavigate();
  const {noneUser} = useParams()
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

        let user = await authAPI().get(endpoints['current-customer'])
        if (user.data.is_customer === true|| user.data.provider === null) {
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
      //if data is not familier, then we update the value of user.
      if(user.data.first_name !== obj.familyName || user.data.last_name !== obj.givenName || user.data.image !== obj.imageUrl){
        
        try {
          let res = await API.post(endpoints['update-user'](user.data.id),{
            'image':obj.imageUrl,
            'first_name':obj.familyName,
            'last_name':obj.givenName
          })
          if(res.status === 200){
            alert('successfully')
          }else{
            alert('fail!');
          }
        } catch (error) {
          alert('err')
        }
        
      }
      if (user.data.is_customer === true || user.data.provider === 'Google') {
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

    }
    const registerGoogleUser = async (obj) => {
      try {
        const form = new FormData();
        form.append("first_name", obj.familyName);
        form.append("last_name", obj.givenName);
        form.append("username", obj.email);
        form.append("email", obj.email);
        form.append("password", "1951012031z");
        form.append("is_customer", true);
        form.append("is_seller", false);
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
      <div className="text-danger ps-5 mb-5" style={{ marginTop: '-20px' }}>{err}</div>
    </>
  )
  if (err == '') {
    renderErr = (
      <>
        <div className="d-none text-danger">{err}</div>
      </>
    )
  }
  if(noneUser !== null){
    nav(-1);
  }
  if (user !== null)
    return <Navigate to="/" />
  const renderLoginCustomer = (
    <>
      <MDBContainer fluid>
        <MDBRow>

          <MDBCol sm='8'>

            <div className='d-flex flex-row ps-5 pt-5'>

              <span className="h1 fw-bold mb-0">TIKI</span>
            </div>

            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

              <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in for customer</h3>

              <Form onSubmit={login}>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={e => setUsername(e.target.value)} name="username" label='Email address' id='formControlLg' type='text' size="lg" />
                <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={e => setPassword(e.target.value)} name="password" label='Password' id='formControlLg' type='password' size="lg" />
                {renderErr}
                <Button className="mb-4 px-5 mx-5 w-100" type='submit' color='info' size='lg'>Login</Button>

                {/* <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p> */}
                <p className='ms-5'>Don't have an account? <Link to={'/signup/customer/'} className="link-info">Register here</Link ></p>

              </Form>
              <div className="text-center">
                <p className='text-center'>or sign up with:</p>

                {/* <MDBBtn
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
                  </MDBBtn> */}

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
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
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <FacebookLogin
                    appId="224659516845119"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                  />
                </MDBBtn>
                {/* <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <GoogleLogout
                      clientId="76223967305-r9itrvl9fhsgkkvbgo8hbdglt65a7kn8.apps.googleusercontent.com"
                      buttonText="Logout"
                      onLogoutSuccess={onSuccess}
                    >
                    </GoogleLogout>
                  </MDBBtn> */}
              </div>
            </div>


          </MDBCol>

          <MDBCol sm='4' style={{ marginTop: '15%', color: '#54b4d3' }} className='d-none d-sm-block px-0'>
            <h1 className="fst-italic">
              Welcome to TiKi
            </h1>
          </MDBCol>

        </MDBRow>

      </MDBContainer>
    </>
  )
  return (
    <>
      {loading ? <LoadingSpinner /> : renderLoginCustomer}

    </>
  )
}

export default LoginCustomer;