import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import API, { endpoints } from "../../configs/API";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const loadBrands = async () => {
      let res = await API.get(endpoints["brands"]);
      setBrands(res.data);
    };

    loadBrands();
  }, []);
  return (
    <>
      <div className="content-list-brand">
        <strong className="content-list-brand-tittle">Thương hiệu</strong>
        <ul className="content-list-brand_ul">
        {Array.from(brands).map(b=> 
                    <li>
                    <Link to={`/`}>
                      <img
                        src={b.image.startsWith('http')? b.image : `http://127.0.0.1:8000/static/`+b.image}
                        alt=""
                      />
                      {b.first_name}
                    </Link>
                  </li>
                  )}
          
        </ul>
      </div>
    </>
  );
};
export default Brands;
