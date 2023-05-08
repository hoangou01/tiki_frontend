import { Link } from "react-router-dom";
import SetImage from "./SetImage";
import { NumericFormat } from 'react-number-format';
import Numeral from 'react-numeral';
const Items = ({ obj, typeCol }) => {
  const defaultImage = 'https://res.cloudinary.com/hm-findingjob/image/upload/v1683263922/zvubofsvwo50q41bgpdh.jpg'
  let url = `/categories/${obj.category}/products/${obj.id}/`;
  return (
    <>
      <Link to={url} className='text-dark shadow_style'>
        <div className="recommend-product mt-5 shadow_style">
          <div className="header_product">
            <picture>
              {typeCol === 2 ? (<img
                src={obj.image.startsWith('http')? obj.image :  'http://127.0.0.1:8000/' + obj.image }                
                  alt="" style={{ width: "150px", height: "150px" }}
              />) : (
                <img
                  src={obj.image.startsWith('http')? obj.image : 'http://127.0.0.1:8000/' + obj.image}
                  alt="" style={{ width: "180px", height: "180px" }}
                />
              )}
            </picture>
          </div>
          <div className="product_info">
            <div className="product_name">
              <span>{obj.name}</span>
            </div>
            <div className="product_rate_sold">
              <div className="product_rate">
                {obj.rating == null ? 5 : obj.rating}
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
                <span>còn lại {obj.salable_quantity}</span>
              </div>
            </div>
            <div className="product_price">
              <span><Numeral
        value={obj.price_discount}
        format={"0,0"}
      />đ</span>
              <span className="discount"> -{obj.discount}%</span>
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
      </Link>
    </>
  );
};
export default Items