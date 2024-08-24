import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Renavbar from '../../Components/CustomComponents/Renavbar';
import { fetchFormResponses, fetchFormById } from '../../api/Form';
import styles from './Response.module.css';
import { CiCalendar } from "react-icons/ci";
import toast from 'react-hot-toast';

const Response = () => {
  const { formId } = useParams();
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [formUrl, setFormUrl] = useState('');
  const [containsInteractiveElements, setContainsInteractiveElements] = useState(false);

  useEffect(() => {
    if (!formId) {
      setErrorMessage('Form ID is required');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const { form } = await fetchFormById(formId);
        if (form && form.fields) {
          setTotalViews(form.views);
          setFormUrl(form.uniqueUrl || '');
          setContainsInteractiveElements(form.fields.length > 0);

          const filteredFields = form.fields.filter((field) =>
            ['Text', 'Number', 'Email', 'Phone', 'Date', 'Rating', 'Buttons'].includes(field.type) &&
            !/^(text|image|video|gif)/i.test(field.heading)
          );
          setFormFields(filteredFields);
        } else {
          setErrorMessage('Process failed to fetch error ');
          setIsLoading(false);
          return;
        }

        const responses = await fetchFormResponses(formId);
        if (responses && responses.length) {
          const groupedResponses = responses.reduce((acc, response) => {
            const email = response.responses['email'];
            if (!acc[email]) {
              acc[email] = { ...response, responses: { ...response.responses } };
            } else {
              acc[email].responses = { ...acc[email].responses, ...response.responses };
              if (new Date(acc[email].submittedAt) < new Date(response.submittedAt)) {
                acc[email].submittedAt = response.submittedAt;
              }
            }
            return acc;
          }, {});

          const sortedResponses = Object.values(groupedResponses).sort(
            (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
          );
          setResponseData(sortedResponses);
        } else {
          setResponseData([]);
          setErrorMessage('No data found from the user');
        }
      } catch (error) {
        setErrorMessage('No data is taking from user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  if (isLoading) {
    return <div class={styles.spinner}></div>;
  }

  const completionRate = responseData.length ? ((responseData.length / (totalViews / 2)) * 100).toFixed(1) : '0.0';

  const handleShare = async () => {
    if (!formUrl) {
      toast.error("You need to save the form");
      return;
    }
    try {
      const shareUrl = `${window.location.origin}/form/${formUrl}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied");
    } catch (error) {
      toast.error(`Error occur when sharing the form: ${error.message}`);
    }
  };

  const formatResponseDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className={styles.container}>
      <Renavbar
         currentPage="response"
         showFormNameInput={false}
         setFormName={() => {}}
         handleSave={() => {}}
         handleShare={handleShare}
         uniqueUrl={formUrl}
         hasBubblesOrInputs={containsInteractiveElements}
      />
      <div className={`${styles.data} open-sans`}>
        <div className={styles.dataeach}>
          <span>Views</span>
          <span>{totalViews / 2}</span>
        </div>
        <div className={styles.dataeach}>
          <span>Starts</span>
          <span>{responseData.length}</span>
        </div>
        <div className={styles.dataeach}>
          <span>Completion rate</span>
          <span>{completionRate}%</span>
        </div>
      </div>
      {responseData.length > 0 ? (
        <table className={styles.responseTable}>
          <thead>
            <tr>
              <th></th>
              <th className={styles.serial}>
               <span> <CiCalendar /></span>
               <span> Submittion Date</span>
              </th>
              <th>User Email</th>
              {formFields.map((field, index) => (
                <th key={index}>{field.heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responseData.map((response, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{new Date(response.submittedAt).toLocaleString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                <td>{response.responses['email']}</td>
                {formFields.map((field, keyIndex) => (
                  <td key={keyIndex}>
                    {field.type === 'Date' ? formatResponseDate(response.responses[field._id]) : (response.responses[field._id] || '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.noResponses}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Response;
