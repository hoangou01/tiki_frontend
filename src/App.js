import logo from "./logo.svg";
import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Main from "./layouts/main";
import LoginCustomer from "./components/loginPage/LoginCustomer";

import SignupCustomer from "./components/registerPage/SignupCustomer";
import SignupSeller from "./components/registerPage/SignupSeller";
import Product from "./layouts/Product";
import SellerPage from "./layouts/SellerPage";
import AddProduct from "./layouts/AddProduct";
import ProfileCustomer from "./layouts/ProfileCustomer";
import CustomerOrder from "./components/profileCustomerPage/CustomerOrder";
import CustomerInfo from "./components/profileCustomerPage/CustomerInfo";
import OrderDetail from "./components/profileCustomerPage/OrderDetail";
import Login from "./layouts/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import cookie from "react-cookies";
import { useReducer } from "react";
import myUserReducer from "./reducers/myUserReducer";
import LoginSeller from "./components/loginPage/LoginSeller";
import { MyUserContext } from "./configs/MyContext";
import ProductSeller from "./components/sellerpage/ProductSeller";
import SellerInfo from "./components/sellerpage/SellerInfo";
import FilterProduct from "./layouts/FilterProduct";
import ChartJs from "./layouts/ChartJs";
import Cart from "./layouts/Cart";
function App() {
  const [user, dispatch] = useReducer(
    myUserReducer,
    cookie.load("current-user") || null
  );
  return (
    <>
      <MyUserContext.Provider value={[user, dispatch]}>
        <BrowserRouter forceRefresh={true}>
          <Header />
          <Routes>
            <Route path="/" Component={Main} />
            <Route path="/categories/:cateId/products/:productId/" Component={Product} />
            <Route path="/products/" Component={FilterProduct} />
            <Route path="/sellers/:sellerId/" Component={SellerPage}>
              <Route path="profile" Component={SellerInfo} />
              <Route path="products" Component={ProductSeller} />
              
            </Route>
            <Route path="/sellers/:sellerId/charts" Component={ChartJs}></Route>
            <Route path="/sellers/:sellerId/add-product" Component={AddProduct}></Route>
            <Route exact path="/signup/customer" Component={SignupCustomer} />
            <Route exact path="/signup/seller" Component={SignupSeller} />
            <Route path="/cart" Component={Cart} />
            <Route exact path="/login/" element={<Login />}>
              <Route path="seller" element={<LoginSeller />} />
              <Route path="customer" element={<LoginCustomer />} />
            </Route>
            {/* <Route exact path="/add/product" Component={AddProduct} /> */}
            <Route path="/customers/:customerId" element={<ProfileCustomer />}>
              <Route path="profile" element={<CustomerInfo />} />
              <Route path="orders" element={<CustomerOrder />} />
              <Route path="orders/:orderId" element={<OrderDetail />} />
              
            </Route>
            {/* <Route path='*' element={<NotFound />} /> */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </MyUserContext.Provider>
    </>
  );
}

export default App;
