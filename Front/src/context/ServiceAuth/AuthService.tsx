import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://c24-69-webapp.onrender.com";

interface AuthResponse {
  token: string;
}

export const loginService = async (email: string, contraseña: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contraseña }),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: Credenciales incorrectas`);
  }

  const data = await response.json();
  const token = data.token;

  try {
    const decoded = jwtDecode(token);
    console.log("Usuario autenticado:", decoded);
  } catch {
    throw new Error("Token inválido");
  }

  // 🔹 Guardamos el token en cookies (1 día de expiración)
  Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });

  return { token };
};

export const registerService = async (nombre: string, email: string, contraseña: string, dni: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, contraseña, dni }),
  });

  if (!response.ok) throw new Error("Error al registrar usuario");

  const data = await response.json();
  const token = data.token;

  // 🔹 Guardamos el token en cookies
  Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });

  return { token };
};

export const logoutService = async (): Promise<void> => {
  await fetch(`${API_URL}/logout`, { method: "POST" });

  // 🔹 Eliminamos el token de cookies
  Cookies.remove("authToken");
};