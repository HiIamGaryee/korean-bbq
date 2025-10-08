import api from "../utils/axiosConfig";

const ADMIN_BASE = "/api/admin";

// Generic helpers
export const getAdmin = async (path: string, params?: Record<string, any>) => {
  const { data } = await api.get(`${ADMIN_BASE}${path}`, { params });
  return data;
};

export const postAdmin = async (path: string, body?: any, params?: Record<string, any>) => {
  const { data } = await api.post(`${ADMIN_BASE}${path}`, body, { params });
  return data;
};

export const putAdmin = async (path: string, body?: any, params?: Record<string, any>) => {
  const { data } = await api.put(`${ADMIN_BASE}${path}`, body, { params });
  return data;
};

export const deleteAdmin = async (path: string, params?: Record<string, any>) => {
  const { data } = await api.delete(`${ADMIN_BASE}${path}`, { params });
  return data;
};

// Convenience wrappers (optional)
export const getAdminOrders = (params?: { status?: string }) => getAdmin("/orders", params);
export const getAdminOrder = (orderId: string) => getAdmin(`/orders/${orderId}`);
export const addMenuItem = (item: { name: string; price: number; category: string; description: string; unit?: string }) => postAdmin("/menu", item);
export const updateMenuItem = (id: string, item: { name: string; price: number; category: string; description: string; unit?: string }) => putAdmin(`/menu/${id}`, item);
export const deleteMenuItem = (id: string) => deleteAdmin(`/menu/${id}`);
export const getAdminStats = () => getAdmin("/stats");
export const getAdminUsers = () => getAdmin("/users");
export const changeUserRole = (userId: string, role: string) => putAdmin(`/users/${userId}/role`, null, { role });
export const getAdminProfile = () => getAdmin("/profile") as Promise<{ username: string; role: string }>;

// --- Compatibility shims for existing pages ---
// Best Seller
export type BestSellerParams = { code: string; name: string; img?: string };
export const getBestSeller = () => getAdmin("/best-seller");
export const postBestSeller = (body: BestSellerParams) => postAdmin("/best-seller", body);

// Contact Us
export const getContactUs = () => getAdmin("/contact-us");

// Product List (map to menu endpoints for now)
export type ProductListParams = {
  code?: string;
  name: string;
  price: number | string;
  description: string;
  category: string;
  unit?: string;
  image?: string;
  promo?: string;
  acidity?: string;
  roast?: string;
  processing?: string;
};
export const getProductList = () => getAdmin("/menu");
export const postProductList = (body: ProductListParams) => postAdmin("/menu", body);
export const postDeleteProductList = (id: string) => deleteAdmin(`/menu/${id}`);

// Checkout (map to public order endpoint for convenience)
export type CheckoutParams = {
  customer: { name: string; phone: string; email?: string };
  items: Array<{ id: string; quantity: number; priceAtOrderTime: number }>;
  orderType: string;
  specialInstructions?: string | null;
  paymentMethod: string;
  estimatedTotal: number;
};
export const postCheckout = async (body: CheckoutParams) => {
  const { data } = await api.post(`/api/order`, body);
  return data;
};

