import React from "react";
import avatarImage from "../../assets/ThemeImages/avatar.png";
import styles from "./ThemePreview.module.css";

const Preview = ({ selectedTheme }) => {
  let backgroundColor;
  if (selectedTheme === "light") {
    backgroundColor = "#fff";
  } else if (selectedTheme === "dark") {
    backgroundColor = "#171923";
  } else if (selectedTheme === "blue") {
    backgroundColor = "#508C9B";
  }

  return (
    <div className={styles.preview} style={{ backgroundColor }}>
      <div className={styles.chatRow}>
        <img src={avatarImage} alt="avatar" className={styles.avatar} />
        <div className={styles.bubbleLeft}>Hello</div>
      </div>
      <div className={styles.chatRow}>
        <div className={styles.bubbleRight}>Hi</div>
      </div>
    </div>
  );
};

export default Preview;
