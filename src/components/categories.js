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

const Categories = () => {
//   const [categories, setCagories] = useEffect([]);
//   useEffect(() => {
//     const loadCategories = async () => {
//       let res = await API.get(endpoints["categories"]);
//       setCagories(res.data);
//     };

//     loadCategories();
//   }, []);
  return (
    <>
      <div className="content-list-category">
              <strong className="content-list-brand-tittle">Danh mục</strong>
              <ul className="content-list-brand_ul">
                <li><a href="">
                    <img
                      src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                      alt=""/>
                    Đồ chơi - mẹ và bé
                  </a></li>
                <li><a href="">
                    <img
                      src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                      alt=""/>
                    Đồ chơi - mẹ và bé
                  </a></li>
                <li><a href="">
                    <img
                      src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                      alt=""/>
                    Đồ chơi - mẹ và bé
                  </a></li>
                <li><a href="">
                    <img
                      src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                      alt=""/>
                    Đồ chơi - mẹ và bé
                  </a></li>
                <li><a href="">
                    <img
                      src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                      alt=""/>
                    Đồ chơi - mẹ và bé
                  </a></li>
                <li><a href="">
                    <img
                      src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                      alt=""/>
                    Đồ chơi - mẹ và bé
                  </a></li>
                <li><a href="">
                    <img
                      src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                      alt=""/>
                    Đồ chơi - mẹ và bé
                  </a></li>
                <li><a href="">
                    <img
                      src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                      alt=""/>
                    Đồ chơi - mẹ và bé
                  </a></li>
                <li><a href="">
                    <img
                      src="https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp"
                      alt=""/>
                    Đồ chơi - mẹ và bé
                  </a></li>
              </ul>
            </div>
    </>
  );
};
export default Categories;
