import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  dni: string;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  const token = Cookies.get("authToken");
  let user: DecodedToken | null = null;

  if (token) {
    try {
      user = jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  return { ...context, user };
};