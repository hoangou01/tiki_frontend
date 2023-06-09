import { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import API, { authAPI, endpoints } from "../configs/API";
import ProductDescription from "../components/productpage/ProductDescription";
import ProductDetail from "../components/productpage/ProductDetail";
import ProductEvaluate from "../components/productpage/ProductEvaluate";

import RecommendProduct from "../components/productpage/recommendProduct";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Seller from "../components/productpage/Seller";
import Items from "./items";

import vi from "moment/locale/vi";
import cookie from "react-cookies"
import InnerHTML from 'dangerously-set-html-content'
import StarRatings from "react-star-ratings";
import { Numeral } from "react-numeral";
import Moment from "react-moment";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTextArea, MDBTypography } from "mdb-react-ui-kit";
import { MyUserContext } from "../configs/MyContext";
import { Rating } from "react-simple-star-rating";
const Product = () => {
  const { productId } = useParams();
  const { cateId } = useParams();
  const [productDetail, setproductDetail] = useState([]);
  const [evaluate, setEvaluate] = useState([]);
  const [seller, setSeller] = useState([]);
  const [content, setContent] = useState('');
  const [quantityOrder, setQuantityOrder] = useState(1);
  const [recommendProduct, setRecommendProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [rating, setRating] = useState(productDetail.rating);
  const [user,] = useContext(MyUserContext)
  const [rating, setRating] = useState(0)
  // const { customerId } = useParams();
  const [address_ship, setAddress_ship] = useState('');
  const nav = useNavigate();
  const [q] = useSearchParams();

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }
  const defaultImage = 'https://res.cloudinary.com/hm-findingjob/image/upload/v1683087683/gqdlxvzryvif6fjnzgxz.png'

  useEffect(() => {
    const loadProductDetail = async () => {
      setLoading(true);
      try {
        var res = await API.get(endpoints["product-detail"](productId));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setproductDetail(res.data);

    };

    loadProductDetail();
  }, [productId]);
  useEffect(() => {
    console.log(rating)

  }, [productId])
  useEffect(() => {
    const loadEvaluate = async () => {
      var e = `${endpoints["comments"](productId)}`;

      var ratingPr = q.get("rating");
      if (ratingPr !== null) e += `?rating=${ratingPr}`;

      var sort = q.get("sort");
      if (sort !== null) e += `?sort=${sort}`;
      try {
        setLoading(true);

        var res = await API.get(e);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
      setEvaluate(res.data);
    };

    loadEvaluate();
  }, [productId, q]);
  useEffect(() => {
    const loadRecommenedProduct = async () => {
      setLoading(true);
      try {
        var res = await API.get(endpoints["recommendproducts"](cateId));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setRecommendProduct(res.data);
    };

    loadRecommenedProduct();
  }, [cateId]);
  const createOrder = () => {

    const process = async () => {
      try {
        // var res = null;

        if (user !== null) {

          let res = await authAPI().post(endpoints['add-order-user'](user.id), {
            'address_ship': '229/76/16',
            'status': 'chưa thanh toán'

          }, {
            headers: {
              'content-type': 'multipart/form-data',

            }
          })
          if (res.status === 201) {
            console.log("create order succesfully!");

            var resOrder_items = await API.post(endpoints['add-orderItems'](res.data.id), {
              'price': productDetail.price_discount,
              'quantity': quantityOrder,
              'product': productDetail.id,
            }, {
              headers: {
                'content-type': 'multipart/form-data',
  
              }
            })
            if (resOrder_items === 201) {
              console.log('create order items succesfully!')
              nav(`/customers/${user.id}/order`)
            }
          } else {
            console.log('can not create order!')
          }
        }
        else {
          let res = await API.post(endpoints['add-order-nouser'], {
            'address_ship': "229/76/26",
            'status': 'chưa thanh toán'

          }, {
            headers: {
              'content-type': 'multipart/form-data',

            }
          })
          if (res.status === 201) {
            console.log("create order succesfully!");

            var resOrder_items = await API.post(endpoints['add-orderItems'](res.data.id), {
              'price': productDetail.price_discount,
              'quantity': quantityOrder,
              'product': productDetail.id,
            }, {
              headers: {
                'content-type': 'multipart/form-data',
  
              }
            })
            if (resOrder_items === 201) {
              console.log('create order items succesfully!')
              nav(`/customers/${user.id}/order`)
            }
          } else {
            console.log('can not create order!')
          }
        }


      } catch (error) {
        console.log("error")
        console.log(error)
        // setLoading(false)
      } finally {
        // setLoading(false)
      }
    }
    // setLoading(true)

    if (user !== null) {
      if(user.is_customer === true){
        process()

      }else if(user.is_seller === true){
        alert("không thể mua hàng bởi người bán!");
      }
    } else {
      process();
    }

  }

  const addComment = (evt) => {
    evt.preventDefault()
    const process = async () => {
      try {
        let res = await authAPI().post(endpoints['post-comments'](productId), {
          'content': content,
          'rate': rating
        })
        setEvaluate(curr => ([res.data, ...curr]))
      } catch (ex) {
        console.info(ex)
      } finally {
        setLoading(false)
      }
    }

    if (user !== null) {
      setLoading(true)
      process();
      setRating(0)
      setContent('');
    } else {
      let noneUser = 1;
      nav(`/login/${noneUser}/customer/`)
    }
  }
  const addQuantityProduct = () => {
    setQuantityOrder(quantityOrder + 1);
  };



  const subtractQuantityProduct = () => {
    if (quantityOrder === 1) setQuantityOrder(1);
    else setQuantityOrder(quantityOrder - 1);
  };
  const saveProductToCookie = () => {
    cookie.save('cart-product', productDetail)
  }

  return (
    <>
      {loading ? <LoadingSpinner /> : (
        <div id="product_section">
          <Container>
            <div class="product_detail">
              <Row>
                <Col md={12}>
                  <ul class="list_link">
                    <li>
                      <a href="">Trang chủ </a>
                    </li>
                    <li>
                      <a href=""> Đồ chơi mẹ và bé</a>
                    </li>
                    <li>
                      <a href="">Đồ chơi</a>
                    </li>
                    <li>
                      <a href="">Gấu bông</a>
                    </li>
                  </ul>
                </Col>
                <Col md={12}>
                  <div class="product_detail_info">
                    <Row>
                      <Col md={4}>
                        <div class="product_detail-left">
                          <div class="product_detail-img">
                            <picture>
                              <img
                                src={
                                  productDetail.image
                                }
                                alt=""
                              />
                            </picture>
                          </div>
                          <div class="product_detail-listImg"></div>
                          <div class="product_detail_socialmedia">
                            <h5>Chia sẻ: </h5>
                            <img
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-facebook.svg"
                              alt=""
                            />
                            <img
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-messenger.svg"
                              alt=""
                            />
                            <img
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-pinterest.svg"
                              alt=""
                            />
                            <img
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-twitter.svg"
                              alt=""
                            />
                          </div>
                          <div class="product_detail_hotdeal">
                            <a href="">
                              <picture>
                                <img
                                  src="https://salt.tikicdn.com/cache/w1080/ts/tka/ae/f8/a0/3460d2e936b56f2cfecee487a6132b28.png.webp"
                                  alt=""
                                />
                              </picture>
                            </a>
                          </div>
                        </div>
                      </Col>

                      <Col md={8}>
                        <div class="product_detail-right">
                          <span>Thương hiệu</span> <span class="brand">{ }</span>
                          <h4>{productDetail.name}</h4>
                          <div class="rate_sold">
                            <div class="rate">
                              {/* <svg
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
                            </svg> */}
                              <StarRatings
                                rating={productDetail.total_evaluate == null ? 5 : 4}
                                starDimension="20px"
                                starSpacing="2px"
                                starRatedColor="rgb(255, 161, 66)"
                              />
                              (xem {productDetail.total_evaluate} lượt đánh giá)
                            </div>
                            <div class="sold">
                              <span>còn lại</span>{" "}
                              <span class="salble_product">
                                {productDetail.salable_quantity} sản phẩm
                              </span>
                            </div>
                          </div>
                          <div class="price_discount_shop">
                            <Row>
                              <Col md={8}>
                                <div class="price_discount">
                                  <div class="price">
                                    <h3 class="handled_price">
                                      <Numeral
                                        value={productDetail.price_discount}
                                        format={"0,0"}
                                      />

                                      {" "}
                                      đ
                                    </h3>
                                  </div>
                                  <span class="base_price">
                                    {productDetail.base_price}
                                  </span>
                                  <div class="discount">
                                    -{productDetail.discount}%
                                  </div>
                                </div>
                                <div class="size-section">
                                  {/* <span>Size: </span>
                                <span class="size">30cm</span>
                                <div class="list-size">
                                  <div class="size-item">30cm</div>
                                  <div class="size-item">60cm</div>
                                  <div class="size-item active">90cm</div>
                                </div> */}
                                </div>
                                <div class="shipment-section">
                                  <span>Giao đến</span>
                                  <span class="address-ship">
                                    Q.1, P.Bến nghé, Hồ Chí Minh -
                                  </span>
                                  <a href="" class="change-address">
                                    đổi địa chỉ
                                  </a>
                                </div>
                                <div class="freeship-section">
                                  <img
                                    src="https://salt.tikicdn.com/ts/upload/67/e4/c2/02b5400b39bb3371e06d33c1e9f4d854.png"
                                    alt=""
                                  />
                                  <div class="freeship">
                                    <span>Vận chuyển:</span> <span>Miễn phí</span>{" "}
                                    <span class="ship_price">18.000</span>
                                  </div>
                                </div>
                                <div class="congratulation">
                                  <img
                                    src="https://salt.tikicdn.com/ts/upload/bc/0c/39/b30a025f810d5257fbb56efb249151f3.png"
                                    alt=""
                                  />
                                  <span>Chúc mừng bạn được freeship 100%.</span>
                                </div>
                                <div class="amount_buy">
                                  <h5>Số Lượng</h5>
                                  <div class="number">
                                    <button
                                      onClick={subtractQuantityProduct}
                                      class="btn_decrease"
                                    >
                                      -
                                    </button>
                                    <input
                                      type="number"
                                      min="1"
                                      step="1"
                                      value={quantityOrder}
                                      class="number_input"
                                    />
                                    <button
                                      onClick={addQuantityProduct}
                                      class="btn_increase"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <div class="button_buy">
                                    <Link onClick={createOrder} class="btn_buy">
                                      Chọn mua
                                    </Link>
                                    <a onClick={saveProductToCookie} href="" class="btn_add_card">
                                      Thêm giỏ hàng
                                    </a>
                                  </div>
                                </div>
                              </Col>
                              <Col md={4}>
                                <div class="shop">
                                  <div class="shop_info">
                                    <img
                                      src="https://vcdn.tikicdn.com/ts/seller/d7/7e/88/1fd74bf1e3ed61849fb5a9d6a26579d3.jpg"
                                      alt=""
                                    />
                                    <div class="shop_name">
                                      <h5>{`productDetail['seller'].first_name`}</h5>
                                      <img
                                        src="https://salt.tikicdn.com/cache/w100/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png.webp"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div class="shop_rate">
                                    <div class="rate">
                                      <span>
                                        4.7/5{" "}
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
                                      </span>
                                      <span>đánh giá</span>
                                    </div>
                                    <div class="category">
                                      <span>230+</span>
                                      <span>danh mục</span>
                                    </div>
                                  </div>
                                  <div class="btn_watch_shop">
                                    <img
                                      src="https://salt.tikicdn.com/ts/upload/49/27/ff/d735c33edfdc6cf6aeb6e183bec28869.png"
                                      alt=""
                                    />
                                    <span><Link to={`/sellers/${2}/profile`}>Xem shop</Link></span>
                                  </div>
                                  <div class="warranty">
                                    <div class="warranty_time">
                                      <span>Thời gian bảo hành</span>
                                      <span>1 năm</span>
                                    </div>
                                    <div class="warranty_type">
                                      <div class="row">
                                        <span>Hình thức bảo hành</span>
                                        <span>Phiếu bảo hành</span>
                                      </div>
                                    </div>
                                    <div class="warranty_where">
                                      <span>Nơi bảo hành</span>
                                      <span>bảo hành chính hãng</span>
                                    </div>
                                    <div class="warranty_instruction">
                                      <span>Hướng dẫn bảo hành</span>
                                      <span>
                                        <a href="" class="text-primary">
                                          Xem chi tiết
                                        </a>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div class="asure_warranty d-flex">
                                  <div class="asure_1">
                                    <img
                                      src="https://salt.tikicdn.com/ts/upload/2c/48/44/720434869e103b03aaaf1a104d91ad25.png"
                                      alt=""
                                    />
                                    <span>Hoàn tiền 111% nếu hàng giả</span>
                                  </div>
                                  <div class="asure_2">
                                    <img
                                      src="https://salt.tikicdn.com/ts/upload/4b/a1/23/1606089d5423e5cba05e3820ad39708e.png"
                                      alt=""
                                    />
                                    <span>Mở hộp kiểm tra nhận hàng</span>
                                  </div>
                                  <div class="asure_3">
                                    <img
                                      src="https://salt.tikicdn.com/ts/upload/63/75/6a/144ada409519d72e2978ad2c61bc02a7.png"
                                      alt=""
                                    />
                                    <span>Đổi trả trong 30 ngày nếu sản phẩm lỗi</span>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col md={12}>
                  <div class="recommend-product-section">
                    <h5>Sản phẩm tương tự</h5>
                    <div class="recommend-product-list">
                      <Row>
                        {recommendProduct.map((r) => (
                          <Col md={2}>
                            <Items obj={r} typeCol={3} />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <Row>
                    <div class="section_below_product">
                      <Row>
                        <Col md={10}>
                          <div class="detail_info">
                            <h5>Thông tin chi tiết</h5>
                            <div class="d-flex">
                              <div class="detail_info_left">
                                <ul>
                                  <li>Thương hiệu</li>
                                  <li>Xuất xứ thương hiệu</li>
                                  <li>Xuất xứ</li>
                                  <li>Kích thước</li>
                                  <li>Chất liệu</li>
                                </ul>
                              </div>
                              <div class="detail_info_right">
                                <ul>
                                  <li>Memon</li>
                                  <li>{productDetail.is_global ? 'Nước Ngoài' : 'Việt Nam'}</li>
                                  <li>{productDetail.is_global ? 'Nước Ngoài' : 'Việt Nam'}</li>
                                  <li>30cm, 50cm, 70cm (đo chiều dài)</li>
                                  <li>Vải,bông</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="product_description">
                            <h5>Mô tả sản phẩm</h5>
                            <div class="product_description_content text-center">
                              {/* <InnerHTML html={productDetail.content} /> */}
                              {productDetail.content}
                            </div>
                          </div>
                        </Col>
                        <Col md={2}>
                          <div class="advertisement-banner">
                            <a href="">
                              <picture>
                                <img
                                  src="https://salt.tikicdn.com/cache/w1080/ts/tka/02/1a/ce/e6df1478b77162d689a042a5fd492efd.png.webp"
                                  alt=""
                                />
                              </picture>
                            </a>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Row>
                </Col>
                <Col md={12}>
                  <div class="evaluate_section">
                    <h5>Đánh giá - Nhận xét từ khách hàng</h5>
                    <div class="evaluate_header">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="chart_rate">
                            <div class="d-flex">
                              <h5>5</h5>
                              <div class="total_rate">
                                <div class="">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
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
                                    width="24"
                                    height="24"
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
                                    width="24"
                                    height="24"
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
                                    width="24"
                                    height="24"
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
                                    width="24"
                                    height="24"
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
                                <span>{productDetail.total_evaluate} nhận xét</span>
                              </div>
                            </div>
                            <div class="">
                              <div class="rating_level">
                                <div class="stars">
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
                                <div class="loading_process">
                                  <div
                                    class="loading"
                                    style={{ width: "90%" }}
                                  ></div>
                                </div>
                                <span>23</span>
                              </div>
                              <div class="rating_level">
                                <div class="stars">
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
                                <div class="loading_process">
                                  <div
                                    class="loading"
                                    style={{ width: "90%" }}
                                  ></div>
                                </div>
                                <span>1</span>
                              </div>
                              <div class="rating_level">
                                <div class="stars">
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
                                <div class="loading_process">
                                  <div
                                    class="loading"
                                    style={{ width: "90%" }}
                                  ></div>
                                </div>
                                <span>0</span>
                              </div>
                              <div class="rating_level">
                                <div class="stars">
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
                                <div class="loading_process">
                                  <div
                                    class="loading"
                                    style={{ width: "90%" }}
                                  ></div>
                                </div>
                                <span>0</span>
                              </div>
                              <div class="rating_level">
                                <div class="stars">
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
                                <div class="loading_process">
                                  <div
                                    class="loading"
                                    style={{ width: "90%" }}
                                  ></div>
                                </div>
                                <span>0</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="filter_rate">
                            <span>Lọc xem theo:</span>
                            <div class="button_filter">
                              <Link to={`/categories/${cateId}/products/${productDetail.id}/?sort=asc`}>Mới nhất</Link>
                              <Link to={`/categories/${cateId}/products/${productDetail.id}/?sort=dsc`}>Lâu nhất</Link>
                              <a href="">Đã mua hàng</a>
                              <Link to={`/categories/${cateId}/products/${productDetail.id}/?rating=${5}`}>
                                5
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  class="filter-review__star"
                                >
                                  <path
                                    d="M10 2.5L12.1832 7.34711L17.5 7.91118L13.5325 11.4709L14.6353 16.6667L10 14.0196L5.36474 16.6667L6.4675 11.4709L2.5 7.91118L7.81679 7.34711L10 2.5Z"
                                    stroke="#808089"
                                    fill="none"
                                  ></path>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.99996 1.66675L12.4257 7.09013L18.3333 7.72127L13.925 11.7042L15.1502 17.5177L9.99996 14.5559L4.84968 17.5177L6.07496 11.7042L1.66663 7.72127L7.57418 7.09013L9.99996 1.66675ZM9.99996 3.57863L8.10348 7.81865L3.48494 8.31207L6.93138 11.426L5.97345 15.9709L9.99996 13.6554L14.0265 15.9709L13.0685 11.426L16.515 8.31207L11.8964 7.81865L9.99996 3.57863Z"
                                    fill="#808089"
                                  ></path>
                                </svg>
                              </Link>
                              <Link to={`/categories/${cateId}/products/${productDetail.id}/?rating=${4}`}>
                                4
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  class="filter-review__star"
                                >
                                  <path
                                    d="M10 2.5L12.1832 7.34711L17.5 7.91118L13.5325 11.4709L14.6353 16.6667L10 14.0196L5.36474 16.6667L6.4675 11.4709L2.5 7.91118L7.81679 7.34711L10 2.5Z"
                                    stroke="#808089"
                                    fill="none"
                                  ></path>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.99996 1.66675L12.4257 7.09013L18.3333 7.72127L13.925 11.7042L15.1502 17.5177L9.99996 14.5559L4.84968 17.5177L6.07496 11.7042L1.66663 7.72127L7.57418 7.09013L9.99996 1.66675ZM9.99996 3.57863L8.10348 7.81865L3.48494 8.31207L6.93138 11.426L5.97345 15.9709L9.99996 13.6554L14.0265 15.9709L13.0685 11.426L16.515 8.31207L11.8964 7.81865L9.99996 3.57863Z"
                                    fill="#808089"
                                  ></path>
                                </svg>
                              </Link>
                              <Link to={`/categories/${cateId}/products/${productDetail.id}/?rating=${3}`}>
                                3
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  class="filter-review__star"
                                >
                                  <path
                                    d="M10 2.5L12.1832 7.34711L17.5 7.91118L13.5325 11.4709L14.6353 16.6667L10 14.0196L5.36474 16.6667L6.4675 11.4709L2.5 7.91118L7.81679 7.34711L10 2.5Z"
                                    stroke="#808089"
                                    fill="none"
                                  ></path>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.99996 1.66675L12.4257 7.09013L18.3333 7.72127L13.925 11.7042L15.1502 17.5177L9.99996 14.5559L4.84968 17.5177L6.07496 11.7042L1.66663 7.72127L7.57418 7.09013L9.99996 1.66675ZM9.99996 3.57863L8.10348 7.81865L3.48494 8.31207L6.93138 11.426L5.97345 15.9709L9.99996 13.6554L14.0265 15.9709L13.0685 11.426L16.515 8.31207L11.8964 7.81865L9.99996 3.57863Z"
                                    fill="#808089"
                                  ></path>
                                </svg>
                              </Link>
                              <Link to={`/categories/${cateId}/products/${productDetail.id}/?rating=${2}`}>
                                2
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  class="filter-review__star"
                                >
                                  <path
                                    d="M10 2.5L12.1832 7.34711L17.5 7.91118L13.5325 11.4709L14.6353 16.6667L10 14.0196L5.36474 16.6667L6.4675 11.4709L2.5 7.91118L7.81679 7.34711L10 2.5Z"
                                    stroke="#808089"
                                    fill="none"
                                  ></path>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.99996 1.66675L12.4257 7.09013L18.3333 7.72127L13.925 11.7042L15.1502 17.5177L9.99996 14.5559L4.84968 17.5177L6.07496 11.7042L1.66663 7.72127L7.57418 7.09013L9.99996 1.66675ZM9.99996 3.57863L8.10348 7.81865L3.48494 8.31207L6.93138 11.426L5.97345 15.9709L9.99996 13.6554L14.0265 15.9709L13.0685 11.426L16.515 8.31207L11.8964 7.81865L9.99996 3.57863Z"
                                    fill="#808089"
                                  ></path>
                                </svg>
                              </Link>
                              <Link to={`/categories/${cateId}/products/${productDetail.id}/?rating=${1}`}>
                                1
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  class="filter-review__star"
                                >
                                  <path
                                    d="M10 2.5L12.1832 7.34711L17.5 7.91118L13.5325 11.4709L14.6353 16.6667L10 14.0196L5.36474 16.6667L6.4675 11.4709L2.5 7.91118L7.81679 7.34711L10 2.5Z"
                                    stroke="#808089"
                                    fill="none"
                                  ></path>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.99996 1.66675L12.4257 7.09013L18.3333 7.72127L13.925 11.7042L15.1502 17.5177L9.99996 14.5559L4.84968 17.5177L6.07496 11.7042L1.66663 7.72127L7.57418 7.09013L9.99996 1.66675ZM9.99996 3.57863L8.10348 7.81865L3.48494 8.31207L6.93138 11.426L5.97345 15.9709L9.99996 13.6554L14.0265 15.9709L13.0685 11.426L16.515 8.31207L11.8964 7.81865L9.99996 3.57863Z"
                                    fill="#808089"
                                  ></path>
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="evaluate_content">
                      <div class="row">
                        {evaluate.map(e => (
                          <div class="evaluate_content_item">
                            <div class="row">
                              <div class="col-md-4">
                                <div class="customer_evalua_info">
                                  <div class="d-flex">
                                    <div class="avatar-img">
                                      <img src={e.account.image.startsWith('http') ? e.account.image : e.account.image.startsWith('static') ? 'http://127.0.0.1:8000/' + e.account.image : defaultImage}
                                        className="rounded-circle" style={{ width: '100px', height: '100px' }}
                                      />
                                    </div>
                                    {/* <div class="avatar-text">NP</div> */}
                                    <div class="name">
                                      <span>{(!e.account.first_name || !e.account.last_name) ? 'người ẩn danh' : (e.account.first_name + ' ' + e.account.last_name)}</span>
                                      <span>Tham gia 2 năm trước</span>
                                    </div>
                                  </div>
                                  <div class="written_evalute">
                                    <span>
                                      <img
                                        src="https://salt.tikicdn.com/ts/upload/c6/67/f1/444fc9e1869b5d4398cdec3682af7f14.png"
                                        alt=""
                                      />{" "}
                                      đã viết:
                                    </span>
                                    <span>77 đánh giá</span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-8">
                                <div class="customer_evalua_content">
                                  <div class="d-flex">
                                    <div class="rating_level">
                                      <StarRatings
                                        rating={e.rate == null ? 5 : e.rate}
                                        starDimension="20px"
                                        starSpacing="2px"
                                        starRatedColor="rgb(255, 161, 66)"
                                      />
                                    </div>
                                    <span style={{ marginTop: "5px" }}>{e.rate == 5 ? "Rất hài lòng" : e.rate == 4 ? 'hài lòng' : e.rate == 3 ? 'tạm hài lòng' : "chưa hài lòng"}</span>
                                  </div>
                                  <div class="is_buy">
                                    <span class="check_icon"></span>
                                    đã mua hàng
                                  </div>
                                  <div class="content">
                                    <p>
                                      {e.content}
                                    </p>
                                  </div>
                                  {/* <div class="size">
                                <span>Size:</span>
                                <span> 30cm</span>
                              </div> */}
                                  <div class="evaluate-time">
                                    <span>đánh giá vào </span>
                                    <span><Moment fromNow>{e.created_date}</Moment></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="post-evaluate w-100">
                          <Form onSubmit={addComment}>
                            <MDBContainer className="py-5 w-100" style={{ width: "100%" }} >
                              <MDBRow className="" style={{ width: '100%' }}>
                                <MDBCol md="10" lg="8" xl="12">
                                  <MDBCard>
                                    <MDBCardBody className="p-4">
                                      <div className="d-flex flex-start w-100">

                                        {user ? (<MDBCardImage
                                          className="rounded-circle shadow-1-strong me-3"
                                          src={user.image.startsWith('http') ? user.image : 'http://127.0.0.1:8000/' + user.image}
                                          alt="avatar"
                                          width="65"
                                          height="65"
                                        />) : (<MDBCardImage
                                          className="rounded-circle shadow-1-strong me-3"
                                          src={defaultImage}
                                          alt="avatar"
                                          width="65"
                                          height="65"
                                        />)}

                                        <div className="w-100">
                                          <MDBTypography tag="h5">Add a comment</MDBTypography>
                                          <div>

                                            <Rating onClick={handleRating} initialValue={rating} />

                                          </div>
                                          <MDBTextArea value={content} onChange={e => setContent(e.target.value)} label="What is your view?" rows={4} />

                                          <div className="d-flex justify-content-between mt-3">
                                            <MDBBtn color="danger">Danger</MDBBtn>
                                            <Button type="submit" color="success" >
                                              Send <MDBIcon fas icon="long-arrow-alt-right ms-1" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </MDBCardBody>
                                  </MDBCard>
                                </MDBCol>
                              </MDBRow>
                            </MDBContainer>
                          </Form>
                        </div>
                      </div>
                    </div>


                  </div>
                  <div class="advertisement_banner_section">
                    <Row>
                      <Col md={6}>
                        <div class="banner-1">
                          <picture>
                            <img
                              src="https://salt.tikicdn.com/ts/tka/ae/f8/a0/3460d2e936b56f2cfecee487a6132b28.png"
                              alt=""
                            />
                          </picture>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div class="banner-2">
                          <picture>
                            <img
                              src="https://salt.tikicdn.com/ts/tka/59/d4/71/ec8530779b16ea1028ace4230137cc92.jpg"
                              alt=""
                            />
                          </picture>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

      )}
    </>
  );
};
export default Product;
