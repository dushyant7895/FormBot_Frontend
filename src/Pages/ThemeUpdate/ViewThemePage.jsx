import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/CustomComponents/Renavbar";
import Sidebar from "./ThemeSidebar";
import Preview from "./ThemePreview";
import toast from 'react-hot-toast';
import styles from "./Theme.module.css";
import { updateFormTheme, fetchFormById } from '../../api/Form';


const ThemePage = () => {
  const { formId } = useParams();
  const [currentTheme, setCurrentTheme] = useState("");
  const [formData, setFormData] = useState({});
  const [formUrl, setFormUrl] = useState("");
  const [containsFields, setContainsFields] = useState(false);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        console.log(`Loading form data for formId: ${formId}`);
        const response = await fetchFormById(formId);
        console.log('Form data loaded:', response.form);
        setFormData(response.form);
        setCurrentTheme(response.form.theme);
        setFormUrl(response.form.uniqueUrl || "");
        setContainsFields(response.form.fields.length > 0);
      } catch (error) {
        console.error("Error loading form data", error);
        toast.error("Error loading form data");
      }
    };

    loadFormData();
  }, [formId]);

  const updateTheme = async (theme) => {
    setCurrentTheme(theme);
    try {
      console.log(`Updating theme for formId: ${formId} to ${theme}`);
      await updateFormTheme(formId, theme);
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme", error.message);
      toast.error(`Error updating theme: ${error.message}`);
    }
  };

  const shareForm = async () => {
    console.log('shareForm executed in ThemePage component');
    if (!formUrl) {
      toast.error("Please save the form before sharing.");
      return;
    }
    try {
      const shareLink = `${window.location.origin}/form/${formUrl}`;
      console.log('Generated share link in ThemePage component:', shareLink);
      navigator.clipboard.writeText(shareLink);
      toast.success("Form link copied to clipboard");
    } catch (error) {
      console.error("Error sharing form", error.message);
      toast.error(`Error sharing form: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar
        currentPage="theme"
        showFormNameInput={false}
        handleShare={shareForm}
        uniqueUrl={formUrl}
        hasBubblesOrInputs={containsFields}
      />
      <div className={styles.main}>
        <Sidebar onThemeChange={updateTheme} />
        <Preview selectedTheme={currentTheme} />
      </div>
    </div>
  );
};

export default ThemePage;
