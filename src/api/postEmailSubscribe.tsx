import { HttpResponse } from "../utils/types";
import { checkPostResponse } from "../utils/function";
import api from "../utils/axiosConfig";

export type EmailSubscribeParams = {
  email: string;
};

export type EmailSubscribeResponse = {};

export const postEmailSubscribe = (params: EmailSubscribeParams) => {
  return api
    .post<HttpResponse<EmailSubscribeResponse>>("/emailsubscribe", {
      ...params,
    })
    .then(checkPostResponse);
};
