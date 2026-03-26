import React, { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { useThemeStore } from "./store/useThemeStore.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme || "light");
  }, [theme]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
