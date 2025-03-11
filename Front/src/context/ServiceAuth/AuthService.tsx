import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const API_URL = "https://api.example.com";

interface AuthResponse {
  token: string;
}

export const loginService = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Credenciales incorrectas");

  const authHeader = response.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) throw new Error("Token no encontrado en la respuesta");

  const token = authHeader.split(" ")[1]; // Extrae el token después de "Bearer"

  // 🔹 Decodificamos el token para verificarlo
  try {
    const decoded = jwtDecode(token);
    console.log("Usuario autenticado:", decoded);
  } catch (error) {
    throw new Error("Token inválido");
  }

  // 🔹 Guardamos el token en cookies (1 día de expiración)
  Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });

  return { token };
};

export const registerService = async (nombre: string, email: string, password: string, dni: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password, dni }),
  });

  if (!response.ok) throw new Error("Error al registrar usuario");

  const authHeader = response.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) throw new Error("Token no encontrado en la respuesta");

  const token = authHeader.split(" ")[1];

  // 🔹 Guardamos el token en cookies
  Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });

  return { token };
};

export const logoutService = async (): Promise<void> => {
  await fetch(`${API_URL}/logout`, { method: "POST" });

  // 🔹 Eliminamos el token de cookies
  Cookies.remove("authToken");
};
