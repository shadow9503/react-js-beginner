import { useState, useEffect } from "react";
import styles from "./FloatingBar.module.css";

const FloatingBar = () => {
  const [screenMode, setScreenMode] = useState(true);
  const onClick = (e) => {
    setScreenMode((current) => !current);
  };
  return (
    <div className={styles.floating}>
      <div
        className={screenMode ? styles.btn__lightmode : styles.btn__darkmode}
        onClick={onClick}
      ></div>
    </div>
  );
};

export default FloatingBar;
