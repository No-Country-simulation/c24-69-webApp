import { createContext  } from "react";

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  dni: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (nombre: string, email: string, password: string, dni: string) => Promise<void>;
  }
  
  export const AuthContext = createContext<AuthContextType | undefined>(undefined);

