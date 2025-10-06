import api from "../../utils/axiosConfig";

export const postDeleteProductList = (id: string) => {
  return api
    .delete(`/product/${id}`) // Pass id in the URL
    .then((response) => {
      return response.data;
    });
};
