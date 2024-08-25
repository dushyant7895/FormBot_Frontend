import axios from "axios";

const BACKEND_URL = 'https://form-bot-backend-nine.vercel.app';

const saveForm = async (getAllData) => {
  console.log("save button is clicked");
  const recivedToken = localStorage.getItem("token");
  if (!recivedToken) {
    throw new Error("Token not found");
  }
  try {
    const res = await axios.post(
      `${BACKEND_URL}/form/saveform`,
      getAllData,
      {
        headers: {
          Authorization: `Bearer ${recivedToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const updateForm = async (Id, formData) => {
  const recivedToken = localStorage.getItem("token");
  if (!recivedToken) {
    throw new Error("Token Not Found");
  }
  try {
    const res = await axios.put(
      `${BACKEND_URL}/form/updateform/${Id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${recivedToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const getformbyusers = async (Id) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/form/user/${Id}`
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const fetchFormById = async (Id) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/form/fetchform/${Id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const fetchFormByUniqueUrl = async (url) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/form/fetchByUniqueUrl/${url}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Page Not Found 404");
  }
};

const getFormsByFolder = async (Id) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/form/folder/${Id}`
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong in frontend");
    }
  }
};

const saveFormResponse = async (url, responseData) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/responses/saveResponse/${url}`,
      responseData
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong in frontend");
    }
  }
};

const fetchFormResponses = async (Id) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/responses/form/${Id}/responses`
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error while fetching responses in frontend");
    }
  }
};

const updateFormTheme = async (Id, theme) => {
  const recivedToken = localStorage.getItem("token");
  if (!recivedToken) {
    throw new Error("Token Not Found");
  }
  try {
    const res = await axios.put(
      `${BACKEND_URL}/form/updateTheme/${Id}`,
      { theme },
      {
        headers: {
          Authorization: `Bearer ${recivedToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteForm = async (Id) => {
  const recivedToken = localStorage.getItem("token");
  if (!recivedToken) {
    throw new Error("Token Not Found");
  }
  try {
    const res = await axios.delete(
      `${BACKEND_URL}/form/deleteform/${Id}`,
      {
        headers: {
          Authorization: `Bearer ${recivedToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong in frontend");
    }
  }
};

const updateViewCount = async (Id) => {
  try {
    await axios.get(`/forms/${Id}`);
  } catch (error) {
    console.error("Error occur when updat view counting:", error);
  }
};

export {
  saveForm,
  updateForm,
  getformbyusers,
  fetchFormById,
  fetchFormByUniqueUrl,
  getFormsByFolder,
  saveFormResponse,
  fetchFormResponses,
  updateFormTheme,
  deleteForm,
  updateViewCount,
};
