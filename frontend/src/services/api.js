// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle different response formats
api.interceptors.response.use(
  (response) => {
    // If response data is an array, return it directly
    if (Array.isArray(response.data)) {
      return response.data;
    }
    // If response data is an object, check for Status field
    if (response.data && response.data.Status === "OK") {
      // Return the data property if it exists, otherwise return the whole response
      return response.data.data || response.data;
    }
    // For other cases, return the data as is
    return response.data;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// user profile APIs
// src/services/api.js - Add these functions
export const getUserById = async (id) => {
  const response = await api.get(`/users?id=${id}`);
  return response;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users?id=${id}`, userData);
  return response;
};

// Auth APIs
export const loginUser = async (email, password) => {
  return await api.get(`/login?email=${email}&password=${password}`);
};

export const registerUser = async (userData) => {
  return await api.post("/users", userData);
};

// Category APIs
export const getCategories = async () => {
  return await api.get("/categories?id=%");
};

export const getCategoryById = async (id) => {
  return await api.get(`/categories?id=${id}`);
};

// Product APIs
export const getProducts = async () => {
  return await api.get("/products?id=%");
};

export const getProductById = async (id) => {
  const response = await api.get(`/products?id=${id}`);
  // Handle single product response
  return Array.isArray(response) ? response[0] : response;
};

export const getProductsByCategory = async (categoryId) => {
  return await api.get(`/products/category?category_id=${categoryId}`);
};

export const searchProducts = async (keyword, value) => {
  return await api.get(`/products/search?keyword=${keyword}&keyvalue=${value}`);
};

// Order APIs
export const createOrder = async (orderData) => {
  return await api.post("/orders", orderData);
};

export const getUserOrders = async (userId) => {
  return await api.get(`/orders/user?user_id=${userId}`);
};

// Order Items APIs
export const createOrderItem = async (itemData) => {
  return await api.post("/order-items", itemData);
};

export const getOrderItems = async (orderId) => {
  return await api.get(`/order-items/order?order_id=${orderId}`);
};

// Payment APIs
export const createPayment = async (paymentData) => {
  return await api.post("/payment", paymentData);
};

// Shipping APIs
export const createShipping = async (shippingData) => {
  return await api.post("/shipping", shippingData);
};

export default api;
