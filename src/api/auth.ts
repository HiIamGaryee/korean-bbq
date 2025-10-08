import api from "../utils/axiosConfig";

export type LoginRequest = { username: string; password: string };
export type LoginResponse = { access_token: string; token_type: string };

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", body);
  return data as LoginResponse;
};

export type SignupRequest = { username: string; email: string; password: string };

export const signup = async (body: SignupRequest) => {
  const { data } = await api.post("/auth/signup", body);
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data as { username: string; role: "admin" | "user" };
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};


