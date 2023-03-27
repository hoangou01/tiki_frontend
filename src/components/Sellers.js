import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import API, { endpoints } from "../configs/API";
import React, { Component } from "react";

const Sellers = () => {
//   const [sellers, setSellers] = useEffect([]);
//   useEffect(() => {
//     const loadSellers = async () => {
//       let res = await API.get(endpoints["sellers"]);
//       setSellers(res.data);
//     };

//     loadSellers();
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
export default Sellers;
