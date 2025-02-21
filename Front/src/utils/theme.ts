export const setTheme = (theme: "light" | "dark") => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }
};

export const loadTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
  }
  return "dark";
};