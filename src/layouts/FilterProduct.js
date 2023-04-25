import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import API, { endpoints } from "../configs/API";
import Items from "./items";
const FilterProduct = () => {
  const { cateId } = useParams();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [q] = useSearchParams();
  const nav = useNavigate();
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        var res = await API.get(endpoints["categories"]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setCategories(res.data);
    };

    loadCategories();
  }, []);
  useEffect(() => {
    const loadProduct = async () => {
      var e = `${endpoints["category-products"]}?page=${page}`;

      var kw = q.get("kw");
      if (kw !== null) e += `&kw=${kw}`;

      var cateId = q.get("cateId");
      if (cateId !== null) e += `&category_id=${cateId}`;

      var priceFrom = q.get("priceFrom");
      if (priceFrom !== null) e += `&priceFrom=${priceFrom}`;

      var priceTo = q.get("priceTo");
      if (priceTo !== null) e += `&priceTo=${priceTo}`;

      var rate = q.get("rate");
      if (rate !== null) e += `&rate=${rate}`;

      var sortStatus = q.get("sortStatus");
      if (sortStatus !== null) e += `&sortStatus=${sortStatus}`;
      setLoading(true);
      
      try {
        var res = await API.get(e);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
      setProduct(res.data.results);
    };

    loadProduct();
  }, [cateId,q]);
  const search = (e) => {
    e.preventDefault();
    nav(`/products/?q=${q}`);
  };
  const sortPrice = (e) => {
    e.preventDefault();
    nav(`/products/?priceFrom=${fromPrice}&priceTo=${toPrice}`);
  };
  const nextPage = () => {
    setPage(page++);
  };
  const prePage = () => {
    if (page == 1) setPage(1);
    else if (page > 1) setPage(page--);
  };
  const clickPage = (e) => {
    e.preventDefault();
    setPage(e.target.value);
  };
  const searchPrice = (e,from,to)=>{
    e.preventDefault();
    if(to == null)
      nav(`/products/?priceFrom=${from}`);
    else
      nav(`/products/?priceFrom=${from}&priceTo=${to}`);
    // nav('/')
  }
  
  const renderFilterProduct = (
    <>
      <div className="category_main">
        <Container>
          <Row>
            <ul className="list_link_page">
              <li>Trang chủ</li>
              <li>Đồ chơi - mẹ và bé</li>
            </ul>
            <Col md={2}>
              <div className="filter_col">
                <div className="category_children">
                  <span className="tittle_filter">Danh mục sản phẩm</span>
                  <ul className="category_children_ul mt-2">
                    {categories.map((c) => (
                      <Link className="text-dark pt-5" to={`/products/?cateId=${c.id}`}>
                        {c.categoryname}
                      </Link>
                    ))}
                  </ul>
                </div>
                <div className="evaluate_filter">
                  <span className="tittle_filter">Đánh giá</span>
                  <Link
                    to={`/products/?rate=${5}`}
                    className="evaluate_filter_link"
                  >
                    <div className="stars">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                    </div>
                    <span>từ 5 sao</span>
                  </Link>
                  <Link 
                    to={`/products/?rate=${4}`}
                    className="evaluate_filter_link"
                  >
                    <div className="stars">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 14 14"
                      >
                        <path
                          d="M7 1.75L8.52824 5.14298L12.25 5.53783L9.47275 8.02966L10.2447 11.6667L7 9.81372L3.75532 11.6667L4.52725 8.02966L1.75 5.53783L5.47176 5.14298L7 1.75Z"
                          stroke="#DDDDE3"
                          fill="#DDDDE3"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.99996 1.16675L8.69801 4.96312L12.8333 5.40491L9.74746 8.193L10.6052 12.2624L6.99996 10.1892L3.39476 12.2624L4.25246 8.193L1.16663 5.40491L5.30191 4.96312L6.99996 1.16675ZM6.99996 2.50507L5.67242 5.47308L2.43944 5.81848L4.85196 7.99821L4.18141 11.1797L6.99996 9.55882L9.81851 11.1797L9.14796 7.99821L11.5605 5.81848L8.3275 5.47308L6.99996 2.50507Z"
                          fill="#DDDDE3"
                        ></path>
                      </svg>
                    </div>
                    <span>từ 4 sao</span>
                  </Link>
                  <Link
                    to={`/products/?rate=${3}`}
                    className="evaluate_filter_link"
                  >
                    <div className="stars">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
                          stroke="#FFA142"
                          fill="#FFD52E"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
                          fill="#FFA142"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 14 14"
                      >
                        <path
                          d="M7 1.75L8.52824 5.14298L12.25 5.53783L9.47275 8.02966L10.2447 11.6667L7 9.81372L3.75532 11.6667L4.52725 8.02966L1.75 5.53783L5.47176 5.14298L7 1.75Z"
                          stroke="#DDDDE3"
                          fill="#DDDDE3"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.99996 1.16675L8.69801 4.96312L12.8333 5.40491L9.74746 8.193L10.6052 12.2624L6.99996 10.1892L3.39476 12.2624L4.25246 8.193L1.16663 5.40491L5.30191 4.96312L6.99996 1.16675ZM6.99996 2.50507L5.67242 5.47308L2.43944 5.81848L4.85196 7.99821L4.18141 11.1797L6.99996 9.55882L9.81851 11.1797L9.14796 7.99821L11.5605 5.81848L8.3275 5.47308L6.99996 2.50507Z"
                          fill="#DDDDE3"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 14 14"
                      >
                        <path
                          d="M7 1.75L8.52824 5.14298L12.25 5.53783L9.47275 8.02966L10.2447 11.6667L7 9.81372L3.75532 11.6667L4.52725 8.02966L1.75 5.53783L5.47176 5.14298L7 1.75Z"
                          stroke="#DDDDE3"
                          fill="#DDDDE3"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.99996 1.16675L8.69801 4.96312L12.8333 5.40491L9.74746 8.193L10.6052 12.2624L6.99996 10.1892L3.39476 12.2624L4.25246 8.193L1.16663 5.40491L5.30191 4.96312L6.99996 1.16675ZM6.99996 2.50507L5.67242 5.47308L2.43944 5.81848L4.85196 7.99821L4.18141 11.1797L6.99996 9.55882L9.81851 11.1797L9.14796 7.99821L11.5605 5.81848L8.3275 5.47308L6.99996 2.50507Z"
                          fill="#DDDDE3"
                        ></path>
                      </svg>
                    </div>
                    <span>từ 3 sao</span>
                  </Link>
                </div>
                <br></br>
                <div className="price_filter">
                  <span className="tittle_filter">giá</span>
                  <div className="price_select d-flex flex-column">
                    <Link
                      onClick={(event)=>{ searchPrice(event,0,50000)}}
                      className="price_select_item"
                    >
                      dưới 50.000
                    </Link>
                    <Link
                      onClick={(event)=>{ searchPrice(event,50000,100000)}}
                      className="price_select_item"
                    >
                      50.000 đến 100.000
                    </Link>
                    <Link
                      onClick={(event)=>{ searchPrice(event,100000,200000)}}
                      className="price_select_item"
                    >
                      100.000 đến 200.000
                    </Link>
                    <Link
                      onClick={(event)=>{ searchPrice(event,200000,500000)}}
                      className="price_select_item"
                    >
                      200.000 đến 500.000
                    </Link>
                    <Link
                      onClick={(event)=>{ searchPrice(event,500000,null)}}
                      className="price_select_item"
                    >
                      trên 500.000
                    </Link>
                  </div>
                  <br></br>
                  <span className="tittle_filter">Chọn khoảng giá</span>
                  <form className="choose_price" action="" onSubmit={sortPrice}>
                    <input
                      type="number"
                      placeholder="giá từ"
                      className="input_price"
                      pattern="[0-9]{5}"
                      name="price_from"
                      min="0"
                      id=""
                      value={fromPrice}
                      onChange={(e) => setFromPrice(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="giá đến"
                      className="input_price"
                      pattern="[0-9]{5}"
                      min="0"
                      name="price_to"
                      value={toPrice}
                      onChange={(e) => setToPrice(e.target.value)}
                    />
                    <button type="submit" className="btn_filter_price">
                      áp dụng
                    </button>
                  </form>
                </div>
                <br></br>
                <div className="location_product">
                  <span className="tittle_filter">Giao hàng</span>
                  <div className="flex-column d-flex">
                    <div className="d-flex">
                      <input
                        type="radio"
                        name="location_product"
                        value=""
                        id=""
                      />
                      <span className="ms-1">Hàng nội địa</span>
                    </div>
                    <div className="d-flex">
                      <input
                        type="radio"
                        name="location_product"
                        value=""
                        id=""
                      />
                      <span className="ms-1">Hàng quốc tế</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={10}>
              <div className="filtered_product_col">
                <Row>
                  <div className="header_section">
                    <h5>Đồ chơi</h5>
                    <div className="adverstiment">
                      <Row>
                        <Col md={6}>
                          <picture>
                            <img
                              src="https://salt.tikicdn.com/ts/tka/af/5b/b3/4a35b857aa966f5965141bc98fc23f7e.png"
                              alt=""
                            />
                          </picture>
                        </Col>
                        <Col md={6}>
                          <picture>
                            <img
                              src="https://salt.tikicdn.com/ts/tka/6e/9a/e0/bd3098457df342e825eddf7c01c9772f.png"
                              alt=""
                            />
                          </picture>
                        </Col>
                      </Row>
                    </div>
                    <div className="header_filter">
                      <ul className="header_filter_ul">
                        <li>
                          <Link to={`/products/?sortStatus=ACS`}>
                            Giá từ thấp đến cao
                          </Link>
                        </li>
                        <li>
                          <Link to={`/products/?sortStatus=DSC`}>
                            Giá từ cao đến thấp
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product_section">
                    <Row>
                      {product?(product.map((p) => (
                        <Col md={2}>
                          
                          <Items obj={p} typeCol={2} />
                        </Col>
                      ))):(<h1 className="text-center">Không có dữ liệu</h1>)}
                    </Row>
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
  return <>{loading ? <LoadingSpinner /> : renderFilterProduct}</>;
};
export default FilterProduct;
