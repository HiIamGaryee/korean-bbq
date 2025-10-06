import { HttpResponse } from "../../utils/types";
import { checkPostResponse } from "../../utils/function";
import api from "../../utils/axiosConfig";

export type CheckoutProductParams = {
  code: string;
  price: string;
  quantity: number;
};

export type CheckoutParams = {
  shipping: string;
  total: string;
  address: string;
  mobile: string;
  email: string;
  status: string;
  products: CheckoutProductParams[];
};

export type CheckoutResponse = any;

export const postCheckout = (params: CheckoutParams) => {
  return api
    .post<HttpResponse<CheckoutResponse>>("/checkout", {
      ...params,
    })
    .then(checkPostResponse);
};
