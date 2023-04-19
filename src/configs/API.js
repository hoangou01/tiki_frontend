import axios from "axios";
import cookie from "react-cookies";
export const endpoints = {
    "categories": `/categories/`,
    "listcategories": `/listcategories/`,
    "products":(cateId)=> `/categories/${cateId}/products/`,
    "recommendproducts":(cateId)=> `/categories/${cateId}/recommend-products/`,
    "product-detail":(productId) => `/products/${productId}/`,
    "sellers":`/sellers/`,
    "seller-detail":(sellerId)=> `/sellers/${sellerId}/current-user`,
    "customer-detail":(customerId) =>`/customers/${customerId}`,
    "order-detail":(orderId)=>`/orders/${orderId}`,
    'comments':(productId) =>`productDetails/${productId}/evaluates/`,
    "register-customer":"/customer/",
    "register-seller":"/seller/",
    "login": '/o/token/',
    "current-customer":'/customers/current-user/',
    "current-seller":'/sellers/current-user/',
    "add-product":(sellerId)=>`/seller/${sellerId}/`,
    "seller-product":(sellerId) => `/sellers/${sellerId}/products/`

    
}
export const authAPI = () => axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        "Authorization": `Bearer ${cookie.load("access-token")}`
    }
})
export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})