import api from "../utils/axiosConfig";

export type OrderItem = { id: string; quantity: number; priceAtOrderTime: number };

export type CreateOrderRequest = {
  customer: { name: string; phone: string; email: string };
  items: OrderItem[];
  orderType: string;
  specialInstructions?: string | null;
  paymentMethod: string;
  estimatedTotal: number;
};

export const createOrder = async (body: CreateOrderRequest) => {
  const { data } = await api.post("/api/order", body);
  return data;
};

export const getOrderById = async (orderId: string) => {
  const { data } = await api.get(`/api/order/${orderId}`);
  return data;
};

export const getOrdersByUser = async (userId: string) => {
  const { data } = await api.get(`/api/order/user/${userId}`);
  return data;
};


