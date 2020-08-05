import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
// import { FiSun } from "react-icons/fi";
import ThemeContext from "../Context/ThemeContext";

import "bootstrap/dist/css/bootstrap.css";
import "./ThemeToggler.css";

const ThemeToggler = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <div>
      <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "light" ? (
          <FaSun className="sun float-right" />
        ) : (
          <FaMoon className="moon float-right" />
        )}
      </div>
    </div>
  );
};

export default ThemeToggler;
