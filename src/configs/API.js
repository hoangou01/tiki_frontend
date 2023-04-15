import axios from "axios";
import cookie from "react-cookies";
export const endpoints = {
    "categories": `/categories/`,
    "listcategories": `/listcategories/`,
    "products":(cateId)=> `/listcategories/${cateId}/productDetails/`,
    "recommendproducts":(cateId)=> `/listcategories/${cateId}/recommendedproducts/`,
    "product-detail":(productId) => `/productDetails/${productId}`,
    "sellers":`/sellers/`,
    "seller-detail":(sellerId)=> `/sellers/${sellerId}`,
    "customer-detail":(customerId) =>`/customers/${customerId}`,
    "order-detail":(orderId)=>`/orders/${orderId}`,
    'comments':(productId) =>`productDetails/${productId}/evaluates/`,
    "login": 'o/token/',
    
}
export const authAPI = () => axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/",
    headers: {
        "Authorization": `Bearer ${cookie.load("access-token")}`
    }
})
export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})