import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';

function LoginCustomer() {  
  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='8'>

          <div className='d-flex flex-row ps-5 pt-5'>
            
            <span className="h1 fw-bold mb-0">TIKI</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in for customer</h3>

            <Form action='' method='post'>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

              <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
              <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
              <p className='ms-5'>Don't have an account? <a href="#!" class="link-info">Register here</a></p>
            </Form>

          </div>

        </MDBCol>

        <MDBCol sm='4' style={{marginTop: '15%',color:'#54b4d3'}} className='d-none d-sm-block px-0'>
          <h1 className="fst-italic">
            Welcome to TiKi
          </h1>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default LoginCustomer;