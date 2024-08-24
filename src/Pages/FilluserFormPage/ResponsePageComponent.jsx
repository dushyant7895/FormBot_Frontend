import React, { useEffect, useState } from "react";
import { fetchFormByUniqueUrl, saveFormResponse } from "../../api/Form";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import avatarImage from "../../assets/ThemeImages/avatar.png";
import { IoMdSend } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./FormResponsePage.module.css";

function FormResponsePage() {
  const { uniqueUrl } = useParams();
  const [formFields, setFormFields] = useState([]);
  const [formInfo, setFormInfo] = useState(null);
  const [responses, setResponses] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState({ email: "", name: "" });
  const [step, setStep] = useState("initial");
  const [buttonClickStates, setButtonClickStates] = useState({});

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetchFormByUniqueUrl(uniqueUrl);
        if (response && response.form) {
          setFormInfo(response.form);
          setFormFields(response.form.fields || []);
        } else {
          toast.error("Form data is not available");
        }
      } catch (error) {
        toast.error("Error fetching form");
      }
    };

    fetchFormData();
  }, [uniqueUrl]);

  useEffect(() => {
    if (step === "form" && currentIndex < formFields.length) {
      const field = formFields[currentIndex];
      if (!field.heading.startsWith("Input Rating") && !field.heading.startsWith("Input")) {
        const timer = setTimeout(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, formFields, step]);

  const handleInputChange = (fieldId, value) => {
    setResponses({ ...responses, [fieldId]: value });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUserSubmit = () => {
    if (step === "name" && user.name) {
      setStep("email");
    } else if (step === "email" && user.email) {
      setStep("form");
    } else {
      toast.error("All fill is required");
    }
  };

  const handleFormSubmit = async (buttonValue, fieldId) => {
    const currentField = formFields[currentIndex];
    const valueToSubmit = buttonValue || responses[currentField._id];

    if (!valueToSubmit) {
      toast.error("This field is required");
      return;
    }

    if (currentField.heading.startsWith("Input Email")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(valueToSubmit)) {
        toast.error("Only valid emails are allowed");
        return;
      }
    }

    try {
      const responsePayload = {
        ...responses,
        email: user.email,
        name: user.name,
        [currentField._id]: valueToSubmit
      };
      await saveFormResponse(uniqueUrl, responsePayload);
      toast.success("Response submitted successfully");

      setButtonClickStates({ ...buttonClickStates, [fieldId]: true });
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      toast.error("Error submitting response");
    }
  };

  const renderMedia = (url) => {
    const trimmedUrl = url.trim();
    if (trimmedUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
      return (
        <img
          src={trimmedUrl}
          alt="Media content"
          style={{ maxWidth: "100%" }}
        />
      );
    } else if (trimmedUrl.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video width="320" height="240" controls>
          <source src={trimmedUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (trimmedUrl.match(/\.(gif)$/i)) {
      return (
        <img
          src={trimmedUrl}
          alt="Media content"
          style={{ maxWidth: "100%" }}
        />
      );
    } else {
      return <p>Unsupported media type</p>;
    }
  };

  const fetchbgColor = () => {
    if (formInfo) {
      switch (formInfo.theme) {
        case "blue":
          return "#508C9B";
        case "dark":
          return "#171923";
        default:
          return "#ffffff";
      }
    }
    return "#ffffff";
  };

  return (
    <div className={styles.chatContainer} style={{ backgroundColor: fetchbgColor() }}>
      {formInfo ? (
        <div>
          <div>
            {step === "initial" && (
              <div>
                <button
                  onClick={() => setStep("email")}
                  className={styles.hiButton}
                >
                  Hi
                </button>
              </div>
            )}
            
            {step !== "initial" && step !== "name" && (
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleUserChange}
                  className={styles.inputBox2}
                  disabled={step !== "email"}
                />
                {step === "email" && (
                  <button
                    onClick={handleUserSubmit}
                    className={styles.sendButton}
                  >
                    <IoMdSend size={"20px"} color="#FFFFFF" />
                  </button>
                )}
              </div>
            )}
            {step === "form" && (
              <div>
                {formFields
                  .slice(0, currentIndex + 1)
                  .map((field) => (
                    <div key={field._id} className={styles.fieldContainer}>
                      {field.heading.startsWith("Input Email") ? (
                        <div>
                          <h3>{field.value}</h3>
                          <input
                            type="email"
                            value={responses[field._id] || ""}
                            onChange={(e) => handleInputChange(field._id, e.target.value)}
                            placeholder="Enter your email"
                            className={`${styles.inputBox} ${buttonClickStates[field._id] ? styles.disabledInput : ''}`}
                            disabled={buttonClickStates[field._id]}
                          />
                          <button
                            onClick={() => handleFormSubmit(null, field._id)}
                            className={`${styles.sendButton} ${buttonClickStates[field._id] ? styles.disabledButton : ''}`}
                            disabled={buttonClickStates[field._id]}
                          >
                            <IoMdSend size={"20px"} color="#FFFFFF" />
                          </button>
                        </div>
                      ) : field.heading.startsWith("Input Rating") ? (
                        <div className={styles.ratingsend}>
                          <h3>{field.value}</h3>
                          <div className={styles.ratingContainer}>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <span
                                key={rating}
                                className={`${styles.ratingBox} ${responses[field._id] === rating ? styles.selectedRating : ''} ${buttonClickStates[field._id] ? styles.disabledRating : ''}`}
                                onClick={() => !buttonClickStates[field._id] && handleInputChange(field._id, rating)}
                              >
                                {rating}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => handleFormSubmit(null, field._id)}
                            className={`${styles.sendButton} ${buttonClickStates[field._id] ? styles.disabledButton : ''}`}
                            disabled={buttonClickStates[field._id]}
                          >
                            <IoMdSend size={"20px"} color="#FFFFFF" />
                          </button>
                        </div>
                      ) : field.heading.startsWith("Input Date") ? (
                        <div className={styles.fieldContainer}>
                          <h3>{field.value}</h3>
                          <DatePicker
                            selected={responses[field._id] || null}
                            onChange={(date) => handleInputChange(field._id, date)}
                            dateFormat="dd-MM-yyyy"
                            className={`${styles.inputBox} ${buttonClickStates[field._id] ? styles.disabledInput : ''}`}
                            placeholderText="Select a date"
                            disabled={buttonClickStates[field._id]}
                          />
                          <button
                            onClick={() => handleFormSubmit(null, field._id)}
                            className={`${styles.sendButton} ${buttonClickStates[field._id] ? styles.disabledButton : ''}`}
                            disabled={buttonClickStates[field._id]}
                          >
                            <IoMdSend size={"20px"} color="#FFFFFF" />
                          </button>
                        </div>
                      ) : field.heading.startsWith("Input Number") ? (
                        <div>
                          <h3>{field.value}</h3>
                          <input
                            type="text"
                            value={responses[field._id] || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                handleInputChange(field._id, value);
                              } else {
                                toast.error("Only numbers are allowed");
                              }
                            }}
                            placeholder="Enter a number"
                            className={`${styles.inputBox} ${buttonClickStates[field._id] ? styles.disabledInput : ''}`}
                            disabled={buttonClickStates[field._id]}
                          />
                          <button
                            onClick={() => handleFormSubmit(null, field._id)}
                            className={`${styles.sendButton} ${buttonClickStates[field._id] ? styles.disabledButton : ''}`}
                            disabled={buttonClickStates[field._id]}
                          >
                            <IoMdSend size={"20px"} color="#FFFFFF" />
                          </button>
                        </div>
                      ) : field.heading.startsWith("Input Phone") ? (
                        <div>
                          <h3>{field.value}</h3>
                          <input
                            type="text"
                            value={responses[field._id] || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                handleInputChange(field._id, value);
                              } else {
                                toast.error("Only numbers are allowed");
                              }
                            }}
                            placeholder="Enter your phone"
                            className={`${styles.inputBox} ${buttonClickStates[field._id] ? styles.disabledInput : ''}`}
                            disabled={buttonClickStates[field._id]}
                          />
                          <button
                            onClick={() => handleFormSubmit(null, field._id)}
                            className={`${styles.sendButton} ${buttonClickStates[field._id] ? styles.disabledButton : ''}`}
                            disabled={buttonClickStates[field._id]}
                          >
                            <IoMdSend size={"20px"} color="#FFFFFF" />
                          </button>
                        </div>
                      ) : field.heading.startsWith("Input Buttons") ? (
                        <div className={styles.buttonFieldContainer}>
                          <button
                            onClick={() => handleFormSubmit(field.value, field._id)}
                            className={`${styles.actionButton} ${buttonClickStates[field._id] ? styles.clicked : ''}`}
                            disabled={buttonClickStates[field._id]}
                          >
                            {field.value}
                          </button>
                        </div>
                      ) : field.heading.startsWith("Input") ? (
                        <div>
                          <h3>{field.value}</h3>
                          <input
                            type="text"
                            value={responses[field._id] || ""}
                            onChange={(e) =>
                              handleInputChange(field._id, e.target.value)
                            }
                            placeholder="Enter your text"
                            className={`${styles.inputBox} ${buttonClickStates[field._id] ? styles.disabledInput : ''}`}
                            disabled={buttonClickStates[field._id]}
                          />
                          <button
                            onClick={() => handleFormSubmit(null, field._id)}
                            className={`${styles.sendButton} ${buttonClickStates[field._id] ? styles.disabledButton : ''}`}
                            disabled={buttonClickStates[field._id]}
                          >
                            <IoMdSend size={"20px"} color="#FFFFFF" />
                          </button>
                        </div>
                      ) : (
                        <div className={styles.mediaContainer}>
                          <img src={avatarImage} alt="" />
                          <div>
                            {field.value.match(
                              /\.(jpeg|jpg|gif|png|mp4|webm|ogg|gif)$/i
                            ) ? (
                              renderMedia(field.value)
                            ) : (
                              <h3 style={{ paddingTop:"20px",marginLeft:"10px"}}>{field.value}</h3>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.spinner}></div>
      )}
    </div>
  );
}

export default FormResponsePage;
