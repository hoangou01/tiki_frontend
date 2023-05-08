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
    "order-detail":(orderId)=>`/orders/${orderId}/`,
    'comments':(productId) =>`products/${productId}/evaluations/`,
    'post-comments':(productId) =>`products/${productId}/evaluates/`,
    "register-customer":"/customers/",
    "register-seller":"/sellers/",
    "login": '/o/token/',
    "current-customer":'/customers/current-user/',
    "current-seller":'/sellers/current-user/',
    "add-product":(sellerId)=>`/sellers/${sellerId}/add-products/`,
    "seller-product":(sellerId) => `/sellers/${sellerId}/products/`,
    "report-products":(sellerId) => `/sellers/${sellerId}/report-product/`,
    "ramdom-category":"/category-ramdom/",
    'add-order-nouser':`/orders/`,
    'add-order-user':(customerId)=>`customers/${customerId}/orders/`,
    'add-orderItems':(orderId)=>`orders/${orderId}/add-order-items/`,
    'order-items':(orderId)=>`orders/${orderId}/order-items/`,
    'update-user':(customerId)=>`customers/${customerId}/update-user/`,
    'update-order':(orderId)=>`orders/${orderId}/update-order/`


    
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