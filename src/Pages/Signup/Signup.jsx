import React, { useState } from 'react';
import { Register } from '../../api/User';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from '../Signup/Signup.module.css';
import traingle from "../../assets/loginsignup/taringlelogin.png";
import Ellipsedown from "../../assets/loginsignup/Ellipsedown.png";
import Ellipseupper from "../../assets/loginsignup/Ellipseupper.png";
import { IoArrowBack } from "react-icons/io5";

function Signup() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    user: '',
    userEmail: '',
    userPassword: '',
    confirmUserPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const onInputChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
    setFormErrors({
      ...formErrors,
      [event.target.name]: '',
    });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!inputData.user) validationErrors.user = 'Need to fill username';
    if (!inputData.userEmail) validationErrors.userEmail = 'Need to fill email';
    if (!inputData.userPassword) validationErrors.userPassword = 'Need to fill password';
    if (!inputData.confirmUserPassword) validationErrors.confirmUserPassword = ' Need to fill Confirm Password';

    if (inputData.userPassword !== inputData.confirmUserPassword) {
      validationErrors.confirmUserPassword = 'enter same password in both field';
    }

    // Check for uppercase letters in email
    if (inputData.userEmail !== inputData.userEmail.toLowerCase()) {
      toast.error('Fill email in lowercase');
      validationErrors.userEmail = 'Fill email in lowercase';
    }

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      
      const responseData = await Register(
        inputData.user,
        inputData.userEmail.toLowerCase(), 
        inputData.userPassword,
        inputData.confirmUserPassword
      );

      
      if (responseData.success) {
        
        toast.success(responseData.message || 'User registered successfully!');
        
        setTimeout(() => {
          navigate('/signin');
        }, 1500); 
      } else {
        
        toast.error(responseData.message || 'Registration failed');
      }
    } catch (error) {
      
      toast.error(error.message || 'An error occurred during signup');
    }
  };
  
  const navigateBack = () => {
    navigate(-1); 
  };

  return (
    <div className={`${styles.container} inter`}>
      <div onClick={navigateBack}  className={styles.shape} style={{ top: "5%", left: "5%", cursor: "pointer"  }}><IoArrowBack size={"25px"} color="white" /></div>
      <img src={traingle} alt="triangle" className={`${styles.shape} ${styles.traingle}`} />
      <img src={Ellipseupper} alt="ellipse upper" className={`${styles.shape} ${styles.ellipseUpper}`} />
      <img src={Ellipsedown} alt="ellipse down" className={`${styles.shape} ${styles.ellipseDown}`} />

      <div className={styles.formContainer}>
        <form onSubmit={onFormSubmit}>
          <div className={`${styles.inputGroup} ${formErrors.user ? styles.inputGroupError : ''}`}>
            <label htmlFor="user" className={formErrors.user ? styles.error : ''}>Username</label>
            <input
              type="text"
              id="user"
              name="user"
              value={inputData.user}
              onChange={onInputChange}
              className={formErrors.user ? styles.errorInput : ''}
              placeholder="Enter your username"
            />
            {formErrors.user && <div className={styles.errorMessage}>{formErrors.user}</div>}
          </div>
          <div className={`${styles.inputGroup} ${formErrors.userEmail ? styles.inputGroupError : ''}`}>
            <label htmlFor="userEmail" className={formErrors.userEmail ? styles.error : ''}>Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={inputData.userEmail}
              onChange={onInputChange}
              className={formErrors.userEmail ? styles.errorInput : ''}
              placeholder="Enter your email"
            />
            {formErrors.userEmail && <div className={styles.errorMessage}>{formErrors.userEmail}</div>}
          </div>
          <div className={`${styles.inputGroup} ${formErrors.userPassword ? styles.inputGroupError : ''}`}>
            <label htmlFor="userPassword" className={formErrors.userPassword ? styles.error : ''}>Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              value={inputData.userPassword}
              onChange={onInputChange}
              className={formErrors.userPassword ? styles.errorInput : ''}
              placeholder="***********"
            />
            {formErrors.userPassword && <div className={styles.errorMessage}>{formErrors.userPassword}</div>}
          </div>
          <div className={`${styles.inputGroup} ${formErrors.confirmUserPassword ? styles.inputGroupError : ''}`}>
            <label htmlFor="confirmUserPassword" className={formErrors.confirmUserPassword ? styles.error : ''}>Confirm Password</label>
            <input
              type="password"
              id="confirmUserPassword"
              name="confirmUserPassword"
              value={inputData.confirmUserPassword}
              onChange={onInputChange}
              className={formErrors.confirmUserPassword ? styles.errorInput : ''}
              placeholder="***********"
            />
            {formErrors.confirmUserPassword && <div className={styles.errorMessage}>{formErrors.confirmUserPassword}</div>}
          </div>
          <div>
            <button type="submit" className={styles.button}>Sign Up</button>
          </div>
        </form>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Already have an account? <Link to="/signin" style={{ color: 'blue', cursor: 'pointer', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
