import { api } from "..";

interface LoginBody {
  email: string;
  password: string;
}
interface UserResponse {
  id: string;
  name: string;
  email: string;
  roleId: string; // Assuming role is a string, adjust as necessary
}

interface LoginResponse {
  user: UserResponse;
  token: string;
}

const login = async (loginBody: LoginBody): Promise<LoginResponse> => {
  const response = await api.post("/users/login", loginBody);

  if (!response.data) {
    throw new Error("Login failed");
  }
  return response.data; // Assuming the token is returned in the response
};
export const authService = {
  login,
};
