import api from "../../utils/axiosConfig";

export const getCheckoutList = async (limit = 50, offset = 0) => {
  try {
    // Adding query parameters directly in the URL or as a params object
    const response = await api.get("/checkout", {
      params: {
        limit, // shorthand for limit: limit
        offset, // shorthand for offset: offset
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch product list:", error.response.data);
    throw error;
  }
};
