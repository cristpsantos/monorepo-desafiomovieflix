import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext, AuthContextData } from "AuthContext";
import React, { useState } from "react";
import Routes from "Routes";
import { ToastContainer } from 'react-toastify';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
      <ToastContainer position="top-center" />
    </AuthContext.Provider>
  );
}

export default App;
