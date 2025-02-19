import React, { createContext, useState, useEffect } from "react";
import { loadTheme, setTheme } from "../utils/theme";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    return loadTheme() || "dark"; // If there's not a saved theme, use dark as default.
  });

  useEffect(() => {
    console.log("Ejecutando useEffect de ThemeProvider");
    const savedTheme = loadTheme() || "dark"; // 👈 Usa "dark" si no hay tema guardado
    console.log("Tema cargado en useEffect:", savedTheme);
    setThemeState(savedTheme);
    setTheme(savedTheme);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("Nuevo tema:", newTheme); // 🚀 Ver si cambia el tema
    setThemeState(newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };