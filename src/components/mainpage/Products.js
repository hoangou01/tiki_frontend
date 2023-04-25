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
import LoadingSpinner from "../LoadingSpinner";
import Items from "../../layouts/items";
import { Link } from "react-router-dom";

const ProductMain = ({ cateRamdom, product }) => {
  const renderProductMain = (
    <>
      <div className="content-main">
        <div className="content-main-advertisement">
          <div className="contain-main_banner">
            <picture>
              <img
                src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/a7/3b/74/39fb8632dc87d3edaf8e82aec0c9050f.png.webp"
                alt=""
              />
            </picture>
          </div>
          <div className="content-main_freeship">
            <picture>
              <img
                src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/65/c4/85/a883d26a3c268dc56fc286b7ac899097.png.webp"
                alt=""
              />
            </picture>
          </div>
        </div>
        <div className="content-main_legalbrand">
          <div className="legalbrand_tittle content-main_tittle">
            <h5>Thương hiệu chính hãng </h5>
            <img
              src="https://salt.tikicdn.com/ts/tka/71/61/5d/dee57a81920f1f4e4dcc3b5878d9bfed.png"
              alt=""
            />
          </div>
          <div className="list_legalbrand">
            <Row>
              <Col md={2}>
                <div className="legalbrand_item">
                  <picture>
                    <img
                      src="https://salt.tikicdn.com/ts/tikimsp/89/b3/ff/48144e6b27147c8a9986bf37671bbbf3.png"
                      alt=""
                    />
                  </picture>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="famous_collection">
          <div className="famous_collection_tittle ">
            <h5>Bộ sưu tập nổi bật</h5>
          </div>
          <div className="list_legalbrand">
            <div className="row">
              <div className="col-md-2">
                <div className="legalbrand_item collection_item">
                  <picture>
                    <img
                      src="https://salt.tikicdn.com/ts/tikimsp/89/b3/ff/48144e6b27147c8a9986bf37671bbbf3.png"
                      alt=""
                    />
                  </picture>
                </div>
              </div>
              <div className="col-md-2">
                <div className="legalbrand_item collection_item">
                  <picture>
                    <img
                      src="https://salt.tikicdn.com/ts/tikimsp/89/b3/ff/48144e6b27147c8a9986bf37671bbbf3.png"
                      alt=""
                    />
                  </picture>
                </div>
              </div>
              <div className="col-md-2">
                <div className="legalbrand_item collection_item">
                  <picture>
                    <img
                      src="https://salt.tikicdn.com/ts/tikimsp/89/b3/ff/48144e6b27147c8a9986bf37671bbbf3.png"
                      alt=""
                    />
                  </picture>
                </div>
              </div>
              <div className="col-md-2">
                <div className="legalbrand_item collection_item">
                  <picture>
                    <img
                      src="https://salt.tikicdn.com/ts/tikimsp/89/b3/ff/48144e6b27147c8a9986bf37671bbbf3.png"
                      alt=""
                    />
                  </picture>
                </div>
              </div>
              <div className="col-md-2">
                <div className="legalbrand_item collection_item">
                  <picture>
                    <img
                      src="https://salt.tikicdn.com/ts/tikimsp/89/b3/ff/48144e6b27147c8a9986bf37671bbbf3.png"
                      alt=""
                    />
                  </picture>
                </div>
              </div>
              <div className="col-md-2">
                <div className="legalbrand_item collection_item">
                  <picture>
                    <img
                      src="https://salt.tikicdn.com/ts/tikimsp/89/b3/ff/48144e6b27147c8a9986bf37671bbbf3.png"
                      alt=""
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="recommend-section">
          <Row>
            <Col md={12}>
              <div className="recommend-choose bg-light">
                <h5>Gợi ý hôm nay</h5>
                <div className="recommend-list">
                  <Row>
                    <Col md={2}>
                      <div className="recommend-item">
                        <img
                          src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                          alt=""
                        />
                        <span>Dành cho bạn</span>
                      </div>
                    </Col>
                    {cateRamdom.map((c) => (
                      <Col md={2}>
                        <Link to={`/?cateId=${c.id}`}>
                          <div className="recommend-item">
                            <img
                              src={
                                c.image.startsWith("http")
                                  ? c.image
                                  : `http://127.0.0.1:8000/` + c.image
                              }
                              alt=""
                            />
                            <span>{c.categoryname}</span>
                          </div>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="recommend-list_product">
                <Row>
                  {product.map((p) => (
                    <Col md={2}>
                      <Items obj={p} typeCol={2} />
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
  return (
    /* {isLoading ? <LoadingSpinner /> : renderProductMain} */
    <>{renderProductMain}</>
  );
};
export default ProductMain;
