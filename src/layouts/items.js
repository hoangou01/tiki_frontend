import { Link } from "react-router-dom";

const Items = ({obj}) => {
  let url = `productDetails/${obj}`;
  return (
    <>
      <Link to={url} className='text-dark shadow_style'>
        <div className="recommend-product shadow_style">
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
              <span>Gấu bông chó Corgi cao cấp Memom - Thú nhồi bông</span>
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
      </Link>
    </>
  );
};
export default Items