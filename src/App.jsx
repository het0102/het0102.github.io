import React from "react";
import "./index.css";
import Home from "./Home";
import CustomCursor from "./components/UI/CustomCursor";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      {/* High-performance GSAP follower cursor */}
      <CustomCursor />
      <Home />
    </ThemeProvider>
  );
};

export default App;
