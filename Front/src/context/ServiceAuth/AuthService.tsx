import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const API_URL = "http://localhost:3000/auth";

interface AuthResponse {
  token: string;
}

export const loginService = async (email: string, contraseña: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contraseña }),
  });

  if (!response.ok) throw new Error("Credenciales incorrectas");
  
  const data = await response.json();
  const token = data.token;

  try {
    const decoded = jwtDecode(token);
    console.log("🔹 Token decodificado en loginService:", decoded); // 👀 Revisa qué datos tiene
  } catch {
    throw new Error("Token inválido");
  }

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

export const registerServices = async (
nombre: string,
email: string,
contraseña: string,
dni: string
): Promise<AuthResponse> => {
const response = await fetch(`${API_URL}register`, {
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
  // 🔹 Eliminamos el token de cookies
  Cookies.remove("authToken");
};