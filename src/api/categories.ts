import api from "../utils/axiosConfig";

export const getCategories = async (): Promise<{ categories: string[] }> => {
  const { data } = await api.get("/api/categories");
  return data;
};

export const getAdminCategories = async (): Promise<{ categories: string[] }> => {
  const { data } = await api.get("/api/admin/categories");
  return data;
};

export const addAdminCategory = async (name: string) => {
  const { data } = await api.post("/api/admin/categories", null, { params: { name } });
  return data;
};

export const deleteAdminCategory = async (name: string) => {
  const { data } = await api.delete("/api/admin/categories", { params: { name } });
  return data;
};


