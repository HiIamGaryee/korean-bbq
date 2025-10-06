import { HttpResponse } from "../../utils/types";
import { checkPostResponse } from "../../utils/function";
import api from "../../utils/axiosConfig";

export type ProductListParams = {
  code: string;
  name: string;
  image?: string;
  price: string;
  acidity?: string;
  roast?: string;
  processing?: string;
  description: string;
  category: string;
  promo?: string;
};

export type ProductListResponse = any;

export const postProductList = (params: ProductListParams) => {
  return api
    .post<HttpResponse<ProductListResponse>>("/product", {
      ...params,
    })
    .then(checkPostResponse);
};
