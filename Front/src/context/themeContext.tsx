import React, { createContext, useState, useEffect } from "react";
import { loadTheme, setTheme } from "../utils/theme";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    return loadTheme() || "dark"; // Si no hay un tema guardado en el navegador, se elegirá "dark" por defecto.
  });

  useEffect(() => {
    const savedTheme = loadTheme() || "dark";
    setThemeState(savedTheme);
    setTheme(savedTheme);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
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