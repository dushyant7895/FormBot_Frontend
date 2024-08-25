import axios from 'axios';

const BACKEND_URL = 'https://form-bot-backend-nine.vercel.app';

const login = async (email, password) => {
    try {
        const res = await axios.post(`${BACKEND_URL}/user/login`, { email, password });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Login failed in frontend");
        }
    }
}

const Register = async (username, email, password, confirmpassword) => {
    try {
        const res = await axios.post(`${BACKEND_URL}/user/signUp`, {
            username,
            email,
            password,
            confirmpassword
        });

        return res.data;  
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Something went wrong in frontend");
        }
    }
}

const getUserFolders = async (Id) => {
    try {
        const res = await axios.get(`${BACKEND_URL}/folder/user/${Id}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Something went wrong in frontend");
        }
    }
}

const updateUser = async (username, email, newpassword, oldpassword, userId) => {
    try {
        const res = await axios.put(`${BACKEND_URL}/user/updateUser/${userId}`, {
            username, email, newpassword, oldpassword
        });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Something went wrong in frontend");
        }
    }
};

const userDetails = async (Id) => {
    try {
        const res = await axios.get(`${BACKEND_URL}/user/userDetails/${Id}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

export { login, Register, getUserFolders, updateUser, userDetails };
