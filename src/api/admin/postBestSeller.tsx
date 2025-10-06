import { HttpResponse } from "../../utils/types";
import { checkPostResponse } from "../../utils/function";
import api from "../../utils/axiosConfig";

export type BestSellerParams = {
  code: string;
  name: string;
  img?: string;
};

export type BestSellerResponse = {};

export const postBestSeller = (params: BestSellerParams) => {
  return api
    .post<HttpResponse<BestSellerResponse>>("/bestseller", {
      ...params,
    })
    .then(checkPostResponse);
};
