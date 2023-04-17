import { useEffect, useState } from "react";
import API, { endpoints } from "../configs/API";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { MyUserContext } from "../configs/MyContext";
import { useContext } from "react";
const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, dispatch] = useContext(MyUserContext);
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        var res = await API.get(endpoints["categories"]);
      } catch (error) {
        setIsLoading(false);
      }
      setIsLoading(false);
      setCategories(res.data);
    };

    loadCategories();
  }, []);

  const logout = () => {
    dispatch({
      type: "logout",
    });
  };

  var infoUser = (
    <>
      <li>
        <Link to={"/login/seller"}>
          <img
            src="https://salt.tikicdn.com/ts/upload/41/28/7d/4713aa0d2855c5c770799f248692f0c5.png"
            alt=""
          />
          Bán hàng
        </Link>
      </li>
      <li>
        <Link to={"/login/customer"}>
          <img
            src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
            alt=""
          />
          Tài khoản
        </Link>
      </li>
    </>
  );
  if (user !== null && user.is_customer == true) {
    
    infoUser = (
      <>
        <li className="li_dropdown">
          <Link to={"/"}>
            <img
              src={user.image}
              // alt={user.image}
            />
            {user.username}
           
          </Link>
          <div className="dropdown_menu">
            <ul>
              <Link className="dropdown_menu_li" to={`/customers/${user.id}/profile`}>Hồ sơ cá nhân</Link>
              <Link className="dropdown_menu_li" to={`/customers/${user.id}/orders`}>Đơn hàng</Link>
              <Link className="dropdown_menu_li" onClick={logout}>Đăng xuất</Link>

            </ul>
          </div>
        </li>

        
      </>
    );
  }
  if (user !== null && user.is_seller == true) {
    alert("seller");

    infoUser = (
      <>
        <li className="li_dropdown">
          <Link to={"/"}>
            <img
              src={user.image}
              // alt={user.image}
            />
            {user.first_name}
           
          </Link>
          <div className="dropdown_menu">
            <ul>
              <Link className="dropdown_menu_li" to={`/sellers/:${user.id}`}>Cửa hàng</Link>
              <Link className="dropdown_menu_li" to={`/sellers/${user.id}/products`}>Đăng sản phẩm</Link>
              <Link className="dropdown_menu_li" onClick={logout}>Đăng xuất</Link>
            </ul>
          </div>
        </li>
      </>
    );
  }

  const renderCategories = (
    <>
      <div id="header">
        <Container>
          <div className="top-header">
            <Row>
              <Col md={2}>
                <div id="logo_company">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
                    alt=""
                  />
                </div>
              </Col>
              <Col md={6}>
                <div id="search_section">
                  <div className="form_search">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
                      alt=""
                      className="form_search_icon"
                    />
                    <input
                      type="text"
                      className="form_search_input"
                      placeholder="Bạn tìm gì hôm nay"
                    />
                    <button className="btn_search text-primary">
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div id="icon_header">
                  <ul className="list_icon_header">
                    <li>
                      {/* <!-- https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png --> */}
                      <Link to={"/"}>
                        <img
                          className="list_icon_header-icon"
                          src="https://salt.tikicdn.com/ts/upload/32/56/db/d919a4fea46f498b5f4708986d82009d.png"
                          alt=""
                        />
                        Trang chủ
                      </Link>
                    </li>
                    {infoUser}
                    <li>
                      <a href="" className="cart-icon">
                        <span className="notification_amount-item">0</span>
                        <img
                          className="cart_item"
                          src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                          alt=""
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
          <div className="bottom-header">
            <ul className="header-list-category">
              {categories.map((c) => (
                <li>
                  <a href="" key={c.id}>
                    {c.categoryname}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <div className="free-ship_header">
          <a href="">
            <picture>
              <img
                src="https://salt.tikicdn.com/ts/upload/5e/ec/fb/150f3c633781ed1da9921e45db90c62d.png"
                alt=""
              />
            </picture>
            <div>
              <strong>mọi đơn từ 149k</strong>
              áp dụng cho cả TiKiNow 2h
            </div>
          </a>
        </div>
      </div>
    </>
  );

  return <>{isLoading ? <LoadingSpinner /> : renderCategories}</>;
};

export default Header;
