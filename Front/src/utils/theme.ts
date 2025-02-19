export const setTheme = (theme: "light" | "dark") => {
  console.log("Guardando theme en localStorage:", theme); // 🚀 Ver si se guarda
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }
};

export const loadTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    console.log("Cargando theme desde localStorage:", savedTheme);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
  }
  return "dark";
};