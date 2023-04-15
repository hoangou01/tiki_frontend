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
import { Navigate } from 'react-router-dom';
const LoginCustomer = ()=> {
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
    else if(username.indexOf('@') == -1 || username.indexOf(' ') >= 0 || username.match(format)){
        setErr("vui lòng nhập username là email , không chứa khoảng trắng và kí tự đặc biệt!")
      }
    else {
      setLoading(true)
      process()
    }
  }

  var renderErr = (
    <>
      <div className="text-danger ps-5 mb-5" style={{marginTop:'-20px'}}>{err}</div>
    </>
  )
  if(err == ''){
    renderErr = (
      <>
        <div className="d-none text-danger">{err}</div>
      </>
    )
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
              <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={e => setUsername(e.target.value)} label='Email address' id='formControlLg' type='text' size="lg" />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={e => setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg" />
              {renderErr}
              <Button className="mb-4 px-5 mx-5 w-100" type='submit' color='info' size='lg'>Login</Button>
              
              <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
              <p className='ms-5'>Don't have an account? <a href="#!" class="link-info">Register here</a></p>
              
            </Form>

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
      {loading? <LoadingSpinner/> : renderLoginCustomer}

    </>
  );
}

export default LoginCustomer;