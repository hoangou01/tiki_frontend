import axios from "axios";
import cookie from "react-cookies";
export const endpoints = {
    "categories": `/categories/`,
    "category-products":  `/products/`,
    "products":(cateId)=> `/categories/${cateId}/products/`,
    "recommendproducts":(cateId)=> `/categories/${cateId}/recommend-products/`,
    "product-detail":(productId) => `/products/${productId}/`,
    "sellers":`/sellers/`,
    "brands":'/brands/',
    "seller-detail":(sellerId)=> `/sellers/${sellerId}/current-user`,
    "customer-detail":(customerId) =>`/customers/${customerId}`,
    "order-detail":(orderId)=>`/orders/${orderId}`,
    'comments':(productId) =>`products/${productId}/evaluations/`,
    "register-customer":"/customer/",
    "register-seller":"/seller/",
    "login": '/o/token/',
    "current-customer":'/customers/current-user/',
    "current-seller":'/sellers/current-user/',
    "add-product":(sellerId)=>`/sellers/${sellerId}/products/`,
    "seller-product":(sellerId) => `/sellers/${sellerId}/products/`,
    "report-products":(sellerId) => `/sellers/${sellerId}/report-product/`,
    "ramdom-category":"/category-ramdom/",

    
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