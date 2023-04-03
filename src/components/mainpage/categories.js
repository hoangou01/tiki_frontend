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

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const defaultImage = `https://salt.tikicdn.com/cache/100x100/ts/upload/66/b9/4f/ab14ee3149780f7d0e44ade4ab16eccd.png.webp`
  useEffect(() => {
    const loadCategories = async () => {
      var res = await API.get(endpoints["categories"]);
      setCategories(res.data);
    };

    loadCategories();
  }, []);
  return (
    <>
      <div className="content-list-category">
              <strong className="content-list-brand-tittle">Danh mục</strong>
              <ul className="content-list-brand_ul">
                {categories.map(c=> 
                    <li><a href="">
                      
                    <img
                      src={(c.image === null) ? defaultImage : c.image}
                      alt=""/>
                    {c.categoryname}
                  </a></li>
                  )}
                
              </ul>
            </div>
    </>
  );
};
export default Categories;