import axios from "axios";

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
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})