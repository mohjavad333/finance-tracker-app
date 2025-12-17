import { api } from './api';
import { AuthResponse, LoginRequest, SignupRequest, User } from '../types/auth';

const USERS_STORAGE_KEY = 'auth_users';

const getStoredUsers = (): Record<string, { email: string; password: string; fullName: string }> => {
  const data = localStorage.getItem(USERS_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

const saveStoredUsers = (users: Record<string, { email: string; password: string; fullName: string }>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      return await api.post<AuthResponse>('/auth/login', credentials);
    } catch {
      // Fallback to local storage
      const users = getStoredUsers();
      const user = Object.values(users).find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const response: AuthResponse = {
        user: {
          id: Object.keys(users).find(
            (key) => users[key].email === credentials.email
          ) || '',
          email: user.email,
          fullName: user.fullName,
          createdAt: new Date().toISOString(),
        },
        token: `token_${user.email}_${Date.now()}`,
      };
      return response;
    }
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    try {
      return await api.post<AuthResponse>('/auth/signup', data);
    } catch {
      // Fallback to local storage
      const users = getStoredUsers();

      if (Object.values(users).some((u) => u.email === data.email)) {
        throw new Error('Email already registered');
      }

      const userId = Math.random().toString(36).substr(2, 9);
      users[userId] = {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      };
      saveStoredUsers(users);

      const response: AuthResponse = {
        user: {
          id: userId,
          email: data.email,
          fullName: data.fullName,
          createdAt: new Date().toISOString(),
        },
        token: `token_${data.email}_${Date.now()}`,
      };
      return response;
    }
  },

  async getMe(): Promise<User> {
    try {
      return await api.get<User>('/auth/me');
    } catch {
      const user = this.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }
      return user;
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
