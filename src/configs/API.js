import axios from "axios";

export const endpoints = {
    "categories": `/categories/`,
    "listcategories": `/listcategories/`,
    "products":`/products/`,
    // "productDetails":(cateId)=> `/listcategories/${cateId}/productDetails/`,
    // "productDetail-detail":(proDetailId) => `/productDetails/${proDetailId}`,
    // "sellers":`/sellers/`,
    // "seller-detail":(sellerId)=> `/sellers/${sellerId}`,
    // "customer-detail":(customerId) =>`/customers/${customerId}`
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})