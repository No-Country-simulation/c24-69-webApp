import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { loginService, registerService, logoutService } from "./ServiceAuth/AuthService";

interface DecodedToken {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  dni: string;
  exp: number;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(Cookies.get("authToken") || null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
        }
      } catch {
        logout();
      }
    }
    setIsLoading(false);
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token } = await loginService(email, password);
      Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
      setToken(token);
      setUser(jwtDecode(token));
    } catch (error: unknown) {
      console.error("Ha ocurrido un error: ", error);
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (nombre: string, email: string, password: string, dni: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!nombre || !email || !password || !dni) {
        setError("Por favor, completa todos los campos.");
        return;
      }
      const { token } = await registerService(nombre, email, password, dni);
      Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
      setToken(token);
      setUser(jwtDecode(token));
    } catch (error: unknown) {
      console.error("Error en el registro:", error);
      setError("Error al registrar usuario. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutService();
    Cookies.remove("authToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};