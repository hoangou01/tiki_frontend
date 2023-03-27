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
import Sellers from "../components/Sellers";
import Categories from "../components/categories";

const Main = () => {
  return (
    <>
      <div id="main">
        <div id="content">
          <Container>
            <Row>
              <Col md={2}>
                <Sellers />
                <Categories />
              </Col>

              <Col md={10}>
                <Row>
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
                                <Col md={2}>
                                  <div className="recommend-item">
                                    <img
                                      src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                                      alt=""
                                    />
                                    <span>Dành cho bạn</span>
                                  </div>
                                </Col>
                                <Col md={2}>
                                  <div className="recommend-item">
                                    <img
                                      src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                                      alt=""
                                    />
                                    <span>Dành cho bạn</span>
                                  </div>
                                </Col>
                                <Col md={2}>
                                  <div className="recommend-item">
                                    <img
                                      src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                                      alt=""
                                    />
                                    <span>Dành cho bạn</span>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="recommend-list_product">
                            <Row>
                              <Col md={2}>
                                <div className="recommend-product">
                                  <div className="header_product">
                                    <picture>
                                      <img
                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/7e/4c/61/d2a902b344f7a706e692081dcfd39ec2.jpg.webp"
                                        alt=""
                                      />
                                    </picture>
                                  </div>
                                  <div className="product_info">
                                    <div className="product_name">
                                      <span>
                                        Gấu bông chó Corgi cao cấp Memom - Thú
                                        nhồi bông
                                      </span>
                                    </div>
                                    <div className="product_rate_sold">
                                      <div className="product_rate">
                                        5
                                        <svg
                                          stroke="currentColor"
                                          fill="currentColor"
                                          stroke-width="0"
                                          viewBox="0 0 24 24"
                                          size="14"
                                          color="#fdd836"
                                          height="14"
                                          width="14"
                                          xmlns="http://www.w3.org/2000/svg"
                                          //   style="{{color: rgb(253, 216, 54)}}"
                                        >
                                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                        </svg>
                                      </div>
                                      <div className="salable_product">
                                        <span>còn lại 23</span>
                                      </div>
                                    </div>
                                    <div className="product_price">
                                      <span>23.000đ</span>
                                      <span className="discount"> -30%</span>
                                    </div>
                                    <div className="product_shipment"></div>
                                    <div className="isLegal">
                                      <img
                                        src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Main;
