import { HttpResponse } from "../utils/types";
import { checkPostResponse } from "../utils/function";
import api from "../utils/axiosConfig";

export type ContactUsParams = {
  email: string;
  name: string;
  phone: string;
  message: string;
};

export type ContactUsResponse = {};

export const postContactUs = (params: ContactUsParams) => {
  return api
    .post<HttpResponse<ContactUsResponse>>("/contactus", {
      ...params,
    })
    .then(checkPostResponse);
};
