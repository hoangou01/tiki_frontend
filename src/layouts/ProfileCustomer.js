import { Col, Container, Row } from "react-bootstrap"
import CustomerInfo from "../components/profileCustomer/CustomerInfo"
import ProfileMenu from "../components/profileCustomer/ProfileMenu"
import CustomerOrder from "../components/profileCustomer/CustomerOrder"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Outlet } from "react-router-dom"
const ProfileCustomer = ()=>{
    return(
        <>
            <Container>
                <Row>
                    <Col md={2}>
                        <ProfileMenu/>
                    </Col>
                    <Col md={10}>
                        <Outlet/> 
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default ProfileCustomer