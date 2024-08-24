import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';
import { IoIosLogOut } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { updateUser } from "../../api/User";
import { CiLock, CiUser } from "react-icons/ci";

const Settings = ({ handleLogout }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailVisible, setIsEmailVisible] = useState(true);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('user');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(userName, userEmail, newPassword, currentPassword, userId);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.message || "Error updating user.");
    }
  };

  return (
    <div className={`${styles.container} open-sans`}>
      <h1 className={styles.title}>Settings</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <CiUser className={styles.icon} size={"20px"} color="#D0D0D0" />
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <CiLock className={styles.icon} size={"20px"} color="#D0D0D0" />
          <input
            type={isEmailVisible ? "text" : "password"}
            placeholder="Update Email"
            className={styles.input}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setIsEmailVisible(!isEmailVisible)}
          >
            {isEmailVisible ? (
              <IoEyeOffOutline size={"20px"} color="#D0D0D0" />
            ) : (
              <IoEyeOutline size={"20px"} color="#D0D0D0" />
            )}
          </button>
        </div>
        <div className={styles.inputGroup}>
          <CiLock className={styles.icon} size={"20px"} color="#D0D0D0" />
          <input
            type={isOldPasswordVisible ? "text" : "password"}
            placeholder="Old Password"
            className={styles.input}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
          >
            {isOldPasswordVisible ? (
              <IoEyeOffOutline size={"20px"} color="#D0D0D0" />
            ) : (
              <IoEyeOutline size={"20px"} color="#D0D0D0" />
            )}
          </button>
        </div>
        <div className={styles.inputGroup}>
          <CiLock className={styles.icon} size={"20px"} color="#D0D0D0" />
          <input
            type={isNewPasswordVisible ? "text" : "password"}
            placeholder="New Password"
            className={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
          >
            {isNewPasswordVisible ? (
              <IoEyeOffOutline size={"20px"} color="#D0D0D0" />
            ) : (
              <IoEyeOutline size={"20px"} color="#D0D0D0" />
            )}
          </button>
        </div>
        <button type="submit" className={styles.updateButton}>Update</button>
      </form>
      <button 
        onClick={() => {
          handleLogout();
          navigate('/');
        }}
        className={styles.logoutButton}
      >
        <span><IoIosLogOut size={"20px"} /></span>
        <span> Log out</span>
      </button>
    </div>
  );
};

export default Settings;
