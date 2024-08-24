import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SignIn from './Pages/Login/LoginPage';
import Register from './Pages/Signup/Signup';
import toast, { Toaster } from 'react-hot-toast';
import MainPage from './Pages/MainPage/MainPage';
import UserSettings from './Pages/Settings/Settings';
import FormView from './Pages/FormPage/FormPage';
import ThemeView from './Pages/ThemeUpdate/ViewThemePage';
import UserResponse from './Pages/ViewResponse/ViewResponsePage';
import NotFound from './Components/PageNotFoundPage/PageNotFound';
import FormResponseView from './Pages/FilluserFormPage/ResponsePageComponent';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setAuthenticated(true);
    }
  }, []);

  const onLogin = () => {
    setAuthenticated(true);
  };

  const onLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    toast.success('Successfully Logout');
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn handleLogin={onLogin} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/form/:userId/:formId" element={<FormView />} />
        <Route path="/theme/:userId/:formId" element={<ThemeView />} />
        <Route path="/theme/:userId/:folderId/:formId" element={<ThemeView />} />
        <Route path="/response/:userId/:formId" element={<UserResponse />} />
        <Route path="/response/:userId/:folderId/:formId" element={<UserResponse />} />
        <Route path="/settings" element={<UserSettings handleLogout={onLogout} />} />
        
        <Route
          path="/dashboard/:userId"
          element={authenticated ? <MainPage handleLogout={onLogout} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/dashboard/:userId/newform"
          element={authenticated ? <FormView isNewForm={true} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/dashboard/:userId/:folderId/newform"
          element={authenticated ? <FormView isNewForm={true} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/dashboard/:userId/:formId"
          element={authenticated ? <FormView isNewForm={false} /> : <Navigate to="/signin" />}
        />
        
        <Route path="/form/:uniqueUrl" element={<FormResponseView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
