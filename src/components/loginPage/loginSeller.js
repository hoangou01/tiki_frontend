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
import API , {authAPI,endpoints} from '../../configs/API';
import cookie from "react-cookies"
import { MyUserContext } from '../../configs/MyContext';
import { Navigate } from 'react-router-dom';
import setErr from '../../layouts/Error';
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
          "client_id": "",
          "client_secret": "",
          "grant_type": "password"
        })

        cookie.save('access-token', res.data.access_token)

        let user = await authAPI().get(endpoints['current-user'])
        cookie.save('current-user', user.data)

        dispatch({
          "type": "login",
          "payload": user.data
        })
      } catch (ex) {
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

  // var renderErr = (
  //   <>
  //     <div className="text-danger" style={{ marginTop: '-20px' }}>{err}</div>
  //   </>
  // )
  // if (err == '') {
  //   renderErr = (
  //     <>
  //       <div className="d-none text-danger">{err}</div>
  //     </>
  //   )
  // }
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
              <MDBInput wrapperClass='mb-4' onChange={e=> setUsername(e.target.value)} label='Email address' id='formControlLg' type='text' size="lg" />
              <MDBInput wrapperClass='mb-4' onChange={e=> setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg" />

              <setErr err={err}/>
              <div className="d-flex justify-content-between mt-5 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn type='submit' className="mb-4 w-100" size="lg">Sign in</MDBBtn>
            </Form>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with facebook
            </MDBBtn>

            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#55acee' }}>
              <MDBIcon fab icon="twitter" className="mx-2" />
              Continue with twitter
            </MDBBtn>

          </MDBCol>

        </MDBRow>

      </MDBContainer>
    </>
  )
  return (
    <>
      {loading ? <LoadingSpinner/> : renderLoginSeller}
    </>
  );
}

export default LoginSeller;