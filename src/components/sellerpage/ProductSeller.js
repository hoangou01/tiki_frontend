import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import API, { authAPI, endpoints } from "../../configs/API";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

function ProductSeller() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sellerId } = useParams();
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        var res = await authAPI().get(endpoints["seller-product"](sellerId));
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
      setProducts(res.data);
    };

    loadProduct();
  }, []);
  const renderProductSeller = (
    <>
      <Container>
        <div className="listproduct_seller">
          <Row>
            {products.map((p) => (
              <Col md={2}>
                <Link to={`/categories/${p.category}/products/${p.id}`}>
                  <div
                    class="recommend-product shadow_style"
                    style={{ marginTop: "10px" }}
                  >
                    <div class="header_product">
                      <picture>
                        <img
                          src={`http://127.0.0.1:8000/` + p.image}
                          alt=""
                          style={{ width: "180px", height: "180px" }}
                        />
                      </picture>
                    </div>
                    <div class="product_info">
                      <div class="product_name">
                        <span>{p.name}</span>
                      </div>
                      <div class="product_rate_sold">
                        <div class="product_rate">
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
                            // style="color: rgb(253, 216, 54);"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                          </svg>
                        </div>
                        <div class="salable_product">
                          <span>còn lại {p.salable_quantity}</span>
                        </div>
                      </div>
                      <div class="product_price">
                        <span>{p.base_price}đ</span>
                        <span class="discount"> -{p.discount}%</span>
                      </div>
                      <div class="product_shipment"></div>
                      <div class="isLegal">
                        <img
                          src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  )
  return (
    <>
      {loading?<LoadingSpinner/>:renderProductSeller}
    </>
  );
}

export default ProductSeller;
