import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
const Login = () => {
    return (
        <>
            
                <Outlet />

        </>
    )
}
export default Login