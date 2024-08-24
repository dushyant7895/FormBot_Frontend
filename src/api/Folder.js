import axios from 'axios';

const BACKEND_URL = 'http://localhost:4000';

const createFolder = async (foldername, usersId) => {
  const receivedToken = localStorage.getItem('token'); 

  if (!receivedToken) {
    throw new Error("Token not found");
  }

  try {
    const res = await axios.post(
      `${BACKEND_URL}/folder/createfolder/${usersId}`,
      { foldername },
      {
        headers: {
          Authorization: `Bearer ${receivedToken}`
        }
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("something went wrong in front end");
    }
  }
};

const deleteFolder = async (Id) => {
  const receivedToken = localStorage.getItem('token');

  if (!receivedToken) {
    throw new Error("Token Not Found");
  }

  try {
    const res = await axios.delete(
      `${BACKEND_URL}/folder/deletefolder/${Id}`,
      {
        headers: {
          Authorization: `Bearer ${receivedToken}`
        }
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong in front end");
    }
  }
};

export { createFolder, deleteFolder };



