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

const Brands = () => {
//   const [Brands, setBrands] = useEffect([]);
//   useEffect(() => {
//     const loadBrands = async () => {
//       let res = await API.get(endpoints["sellers"]);
//       setBrands(res.data);
//     };

//     loadBrands();
//   }, []);
  return (
    <>
      <div className="content-list-brand">
        <strong className="content-list-brand-tittle">Thương hiệu</strong>
        <ul className="content-list-brand_ul">
          <li>
            <a href="">
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                alt=""
              />
              Laroche posay
            </a>
          </li>
          <li>
            <a href="">
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                alt=""
              />
              Laroche posay
            </a>
          </li>
          <li>
            <a href="">
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                alt=""
              />
              Laroche posay
            </a>
          </li>
          <li>
            <a href="">
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                alt=""
              />
              Laroche posay
            </a>
          </li>
          <li>
            <a href="">
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                alt=""
              />
              Laroche posay
            </a>
          </li>
          <li>
            <a href="">
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                alt=""
              />
              Laroche posay
            </a>
          </li>
          <li>
            <a href="">
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                alt=""
              />
              Laroche posay
            </a>
          </li>
          <li>
            <a href="">
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                alt=""
              />
              Laroche posay
            </a>
          </li>
          <li>
            <a href="">
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                alt=""
              />
              Laroche posay
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Brands;
