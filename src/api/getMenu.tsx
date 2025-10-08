import api from "../utils/axiosConfig";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  isAvailable: boolean;
};

export type MenuResponse = {
  menu: MenuItem[];
};

export const getMenu = async (): Promise<MenuResponse> => {
  const res = await api.get("/api/menu");
  return res.data as MenuResponse;
};
