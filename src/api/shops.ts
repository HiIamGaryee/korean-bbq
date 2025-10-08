import api from "../utils/axiosConfig";

export const getShops = async (): Promise<{ shops: { id: string; name: string; isOpen: boolean }[] }> => {
  const { data } = await api.get("/api/shops");
  return data;
};

export const getAdminShops = async () => {
  const { data } = await api.get("/api/admin/shops");
  return data as { shops: { id: string; name: string; isOpen: boolean }[] };
};

export const setAdminShopStatus = async (shopId: string, isOpen: boolean) => {
  const { data } = await api.put(`/api/admin/shops/${shopId}/status`, null, { params: { isOpen } });
  return data as { id: string; isOpen: boolean };
};


