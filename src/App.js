import logo from "./logo.svg";
import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Main from "./layouts/main";
import LoginCustomer from "./components/loginPage/LoginCustomer";
import LoginSeller from "./components/loginPage/loginSeller";
import SignupCustomer from "./components/registerPage/SignupCustomer";
import SignupSeller from "./components/registerPage/SignupSeller";
import Product from "./layouts/Product";
import SellerPage from "./layouts/SellerPage";
import AddProduct from "./layouts/AddProduct";
import ProfileCustomer from "./layouts/ProfileCustomer";
import CustomerOrder from "./components/profileCustomerPage/CustomerOrder";
import CustomerInfo from "./components/profileCustomerPage/CustomerInfo"
import OrderDetail from "./components/profileCustomerPage/OrderDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
function App() {
  return (
    <>
      <BrowserRouter forceRefresh={true}>
        <Header />
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/productDetails/:productId" Component={Product } />
          <Route path="/sellers/sellerID" Component={SellerPage } />
          <Route exact path="/signup/customer" Component={SignupCustomer } />
          <Route exact path="/signup/seller" Component={SignupSeller } />
          <Route exact path="/login/seller" Component={LoginSeller } />
          <Route exact path="/login/customer" Component={LoginSeller } />
          <Route exact path="/add/product" Component={AddProduct } />
          <Route path='/customers/:customerId' element={<ProfileCustomer/>}>
              <Route path="profile" element={<CustomerInfo/>}/>
              <Route path="orders" element={<CustomerOrder/>}/>
              <Route path='orders/:orderId' element={<OrderDetail/>}/>
          </Route>
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
