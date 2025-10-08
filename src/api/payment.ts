import api from "../utils/axiosConfig";

export const createPaymentSession = async (order_id: string, amount: number) => {
  const { data } = await api.post("/api/payment/create", { order_id, amount });
  return data as { session_id: string; status: string; amount: number };
};


