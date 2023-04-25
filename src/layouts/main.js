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
import Brands from "../components/mainpage/Brand";
import Categories from "../components/mainpage/categories";
import Items from "./items";
import ProductMain from "../components/mainpage/Products";
import { useSearchParams } from "react-router-dom";
const Main = () => {
  const [ramdomCatgory,setRamdomCategory] = useState([])
  const [product,setProduct] = useState([])
  const [loading , setLoading] = useState(false);
  const [q] = useSearchParams();

  useEffect(() => {
    const loadRamdomCategory = async () => {
      setLoading(true);
      try {
        var res = await API.get(endpoints["ramdom-category"]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setRamdomCategory(res.data);
    };

    loadRamdomCategory();
  }, []);
  useEffect(() => {
    const loadProducts = async () => {
      var e = `${endpoints["category-products"]}`;

      const cateId = q.get("cateId");
      if (cateId !== null) e += `?category_id=${cateId}`;  
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

    loadProducts();
  }, [q]);
  return (
    <>
      <div id="main">
        <div id="content">
          <Container>
            <Row>
              <Col md={2}>
                <Brands />
                <Categories />
              </Col>

              <Col md={10}>
                <Row>
                  <ProductMain cateRamdom={ramdomCatgory} product={product} />
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
