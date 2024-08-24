import React, { useState } from "react";
import styles from "./ThemeSidebar.module.css";
import blueImage from "../../assets/ThemeImages/blue.png";
import darkImage from "../../assets/ThemeImages/Dark.png";
import lightImage from "../../assets/ThemeImages/light.png";

const Sidebar = ({ onThemeChange }) => {
  const [currentSelection, setCurrentSelection] = useState("");

  const selectTheme = (theme) => {
    setCurrentSelection(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  return (
    <div className={styles.sidebar}>
      <h3>Customize the theme</h3>
      <div className={styles.gridContainer}>
        <div
          className={`${styles.themeOption} ${
            currentSelection === "light" ? styles.selected : ""
          }`}
          onClick={() => selectTheme("light")}
        >
          <img src={lightImage} alt="Light Theme" />
        </div>
        <div
          className={`${styles.themeOption} ${
            currentSelection === "dark" ? styles.selected : ""
          }`}
          onClick={() => selectTheme("dark")}
        >
          <img src={darkImage} alt="Dark Theme" />
        </div>
        <div
          className={`${styles.themeOption} ${
            currentSelection === "blue" ? styles.selected : ""
          }`}
          onClick={() => selectTheme("blue")}
        >
          <img src={blueImage} alt="Blue Theme" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
