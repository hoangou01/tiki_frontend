import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';

function SignupCustomer() {
  return (
    <MDBContainer fluid>

      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>

          <h2 className="fw-bold mb-5">Sign up now for customer</h2>

          <Form action='' method='post'>
            <MDBRow>
                <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='First name' id='form1' name='firstName' type='text'/>
                </MDBCol>

                <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='Last name' id='form1' name='lastName' type='text'/>
                </MDBCol>
            </MDBRow>
            <MDBInput wrapperClass='mb-4' label='Phone' id='form1' name='phone' type='text'  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
            <MDBInput wrapperClass='mb-4' label='Email' id='form1' name='email' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' name='password' type='password'/>

            <MDBBtn className='w-100 mb-4' type='submit' size='md'>sign up</MDBBtn>
          </Form>

          <div className="text-center">

            <p>or sign up with:</p>

            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='facebook-f' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='twitter' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='google' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='github' size="sm"/>
            </MDBBtn>

          </div>

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default SignupCustomer;