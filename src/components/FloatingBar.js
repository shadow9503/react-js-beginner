import { useState, useEffect } from "react";
import { useTheme } from "../context/themeProvider";
import styles from "./FloatingBar.module.css";

const FloatingBar = () => {
  const [screenMode, setScreenMode] = useState(true);
  const [ThemeMode, toggleTheme] = useTheme();
  const onClick = (e) => {
    setScreenMode((current) => !current);
  };
  return (
    <div className={styles.floating}>
      <div
        className={
          ThemeMode == "light" ? styles.btn__lightmode : styles.btn__darkmode
        }
        onClick={toggleTheme}
      ></div>
    </div>
  );
};

export default FloatingBar;
