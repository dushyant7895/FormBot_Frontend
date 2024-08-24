import React, { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../../api/User";
import { useNavigate } from "react-router-dom";
import styles from "../Login/LoginPage.module.css";
import traingle from "../../assets/loginsignup/taringlelogin.png";
import Ellipsedown from "../../assets/loginsignup/Ellipsedown.png";
import Ellipseupper from "../../assets/loginsignup/Ellipseupper.png";
import { IoArrowBack } from "react-icons/io5";

function LoginPage({ handleLogin }) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  async function handleFormSubmit(event) {
    event.preventDefault();

    const validationErrors = {};
    if (!userEmail) validationErrors.email = "Email is required";
    if (!userPassword) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      const response = await login(userEmail, userPassword);

      if (response.success) {
        toast.success(response.message);
        handleLogin();
        localStorage.setItem("token", response.token || "");
        localStorage.setItem("user", response.user || "");
        navigate(`/dashboard/${response.user}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during Login");
    }
  }

  const handleRegisterRedirect = () => {
    navigate("/signup");
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.container} inter`}>
      <div
        className={styles.shape}
        style={{ top: "5%", left: "5%", cursor: "pointer" }}
        onClick={handleBackNavigation}
      >
        <IoArrowBack size={"25px"} color="white" />
      </div>
      <img
        src={traingle}
        alt="triangle"
        className={`${styles.shape} ${styles.traingle}`}
      />
      <img
        src={Ellipseupper}
        alt="ellipse upper"
        className={`${styles.shape} ${styles.ellipseUpper}`}
      />
      <img
        src={Ellipsedown}
        alt="ellipse down"
        className={`${styles.shape} ${styles.ellipseDown}`}
      />
      <div className={styles.formContainer}>
        <form onSubmit={handleFormSubmit}>
          <div
            className={`${styles.inputGroup} ${
              formErrors.email ? styles.inputGroupError : ""
            }`}
          >
            <label
              htmlFor="userEmail"
              className={formErrors.email ? styles.error : ""}
            >
              Email
            </label>
            <input
              id="userEmail"
              name="userEmail"
              onChange={(e) => {
                setUserEmail(e.target.value);
                setFormErrors((prev) => ({ ...prev, email: "" }));
              }}
              type="email"
              value={userEmail}
              placeholder="Enter your email"
              className={formErrors.email ? styles.errorInput : ""}
            />
            {formErrors.email && (
              <div className={styles.errorMessage}>{formErrors.email}</div>
            )}
          </div>
          <div
            className={`${styles.inputGroup} ${
              formErrors.password ? styles.inputGroupError : ""
            }`}
          >
            <label
              htmlFor="userPassword"
              className={formErrors.password ? styles.error : ""}
            >
              Password
            </label>
            <input
              id="userPassword"
              name="userPassword"
              onChange={(e) => {
                setUserPassword(e.target.value);
                setFormErrors((prev) => ({ ...prev, password: "" }));
              }}
              type="password"
              value={userPassword}
              placeholder="***********"
              className={formErrors.password ? styles.errorInput : ""}
            />
            {formErrors.password && (
              <div className={styles.errorMessage}>{formErrors.password}</div>
            )}
          </div>
          <div>
            <button type="submit" className={styles.button}>
              Log in
            </button>
          </div>
        </form>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account?{" "}
          <span
            onClick={handleRegisterRedirect}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Register now
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
