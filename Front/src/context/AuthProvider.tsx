import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {jwtDecode} from "jwt-decode"; // Necesario para leer el token
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
  const [, setError] = useState<string | null>(null);  // Asegúrate de que error sea un string o null
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
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
      localStorage.setItem("token", token);
      setToken(token);
      setUser(jwtDecode(token)); // Decodificar el token al iniciar sesión
    } catch (error: unknown) {
      console.error(error);
      alert("Error en el login");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (nombre: string, email: string, password: string, dni: string) => {
    setIsLoading(true);
    setError(null);  // Limpiar el error antes de un nuevo intento
    try {
      // Verifica que todos los campos estén completos antes de enviar la solicitud
      if (!nombre || !email || !password || !dni) {
        setError("Por favor, completa todos los campos.");
        return;
      }
      const { token } = await registerService(nombre, email, password, dni);
      localStorage.setItem("token", token);
      setToken(token);
      setUser(jwtDecode(token)); // Decodificar el token después de registrar
      console.log("Token en AuthProvider: ", token);
    } catch (error: unknown) {
      console.error("Error en el registro:", error);
      setError("Error al registrar usuario. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutService();
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
