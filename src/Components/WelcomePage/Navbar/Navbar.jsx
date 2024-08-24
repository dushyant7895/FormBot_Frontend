import React from "react";
import styles from "../Navbar/Navbar.module.css";
import FormBotLog from "./FormBotLog.png";
import { NavLink,useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div>
          <img onClick={() => navigate("/")} sizes="35px" src={FormBotLog} alt="FormBot logo" />
        </div>
        <div className="outfit">FormBot</div>
      </div>

      <div className={styles.navbar2}>
        <NavLink to="/signin" className={styles.navLink}>
          <div className={`${styles.signin} open-sans`}> Sign in</div>
        </NavLink>
        <NavLink to="/signup" className={styles.navLink}>
          <div className={`${styles.signup} open-sans`}> Create a FormBot</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
