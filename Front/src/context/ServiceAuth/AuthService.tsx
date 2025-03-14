import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const API_URL = "https://c24-69-webapp.onrender.com/auth";

interface AuthResponse {
  token: string;
}

export const loginService = async (email: string, contraseña: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contraseña }),
  });
  console.log(email, contraseña);
  if (!response.ok) throw new Error("Credenciales incorrectas");
  const data = await response.json();
  console.log("Data de login: ", data);
  const token  = data.token;

  // 🔹 Decodificamos el token para verificarlo
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
  console.log("Datos de usuario en AuthService.tsx: ", nombre, email, contraseña, dni)
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, contraseña, dni }),
  });
  console.log ("Response de AuthService: ", response)
  if (!response.ok) throw new Error("Error al registrar usuario");

  const authHeader = response.headers.get("Authorization");
  const token = authHeader ? authHeader.split(" ")[1] : (await response.json()).token;

  // 🔹 Guardamos el token en cookies
  Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
  console.log("Token en AuthService: ", token)
  return {token};
};

export const logoutService = async (): Promise<void> => {
  await fetch(`${API_URL}/logout`, { method: "POST" });

  // 🔹 Eliminamos el token de cookies
  Cookies.remove("authToken");
};
