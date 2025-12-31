import { api } from "./api";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
} from "../types/auth";

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", data);
    return res;
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/register", {
      email: data.email,
      password: data.password,
      name: data.name,
    });
    return res;
  },

  async getMe(): Promise<User> {
    const res = await api.get<User>("/auth/me");
    return res;
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  setToken(token: string): void {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  setUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
