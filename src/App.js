import logo from "./logo.svg";
import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Main from "./layouts/main";
import LoginCustomer from "./components/login/LoginCustomer";
import LoginSeller from "./components/login/loginSeller";
import SignupCustomer from "./components/register/SignupCustomer";
import SignupSeller from "./components/register/SignupSeller";
import Product from "./layouts/Product";
import SellerPage from "./layouts/SellerPage";
import AddProduct from "./layouts/AddProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
function App() {
  return (
    <>
      <BrowserRouter forceRefresh={true}>
        <Header />
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/products/:productId" Component={Product } />
          <Route path="/sellers/sellerID" Component={SellerPage } />
          <Route exact path="/signup/customer" Component={SignupCustomer } />
          <Route exact path="/signup/seller" Component={SignupSeller } />
          <Route exact path="/login/seller" Component={LoginSeller } />
          <Route exact path="/login/customer" Component={LoginSeller } />
          <Route exact path="/add/product" Component={AddProduct } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
