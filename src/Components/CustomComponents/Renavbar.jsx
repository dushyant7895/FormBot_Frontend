import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Renavbar.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Renavbar = ({ currentPage, formName = '', setFormName, handleSave, handleShare, uniqueUrl, showFormNameInput }) => {
  const navigate = useNavigate();
  const { userId, formId, folderId } = useParams();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    console.log("Params: ", { userId, formId, folderId, uniqueUrl });
  }, [userId, formId, folderId, uniqueUrl]);

  const handleTabClick = (tab) => {
    let path = '';
    switch (tab) {
      case 'theme':
        path = folderId ? `/theme/${userId}/${folderId}/${formId}` : `/theme/${userId}/${formId}`;
        break;
      case 'response':
        path = folderId ? `/response/${userId}/${folderId}/${formId}` : `/response/${userId}/${formId}`;
        break;
      default:
        path = folderId ? `/form/${userId}/${folderId}/${formId}` : `/form/${userId}/${formId}`;
        break;
    }
    navigate(path);
  };

  const handleSaveClick = () => {
    if (showFormNameInput && !formName.trim()) {
      setShowError(true);
      toast.error("Form name is required.");
      return;
    }
    setShowError(false);
    handleSave();
  };

  const handleShareClick = () => {
    if (showFormNameInput && !formName.trim()) {
      setShowError(true);
      toast.error("Form name is required.");
      return;
    }
    setShowError(false);
    handleShare();
  };

  const handleCloseClick = () => {
    navigate(`/dashboard/${userId}`);
  };

  return (
    <div className={`${styles.renavbar} open-sans`}>
      {showFormNameInput && (
        <>
          <input
            className={`${styles.input} ${showError ? styles.error : ''}`}
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Enter form name"
          />
          {showError && <span className={styles.errorMessage}>This field is required</span>}
        </>
      )}
      <div className={styles.centerButtons}>
        <button
          className={`${styles.tabButton} ${currentPage === 'form' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('form')}
        >
          Flow
        </button>
        <button
          className={`${styles.tabButton} ${currentPage === 'theme' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('theme')}
        >
          Theme
        </button>
        <button
          className={`${styles.tabButton} ${currentPage === 'response' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('response')}
        >
          Response
        </button>
      </div>
      <div className={styles.rightButtons}>
        <button className={styles.saveButton} onClick={handleSaveClick}>Save</button>
        <button className={styles.actionButton} onClick={handleShareClick}>Share</button>
        <button className={styles.closeButton} onClick={handleCloseClick}>X</button>
      </div>
    </div>
  );
};

Renavbar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  formName: PropTypes.string,
  setFormName: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  uniqueUrl: PropTypes.string,
  showFormNameInput: PropTypes.bool.isRequired,
};

export default Renavbar;
