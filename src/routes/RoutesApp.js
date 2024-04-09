import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { baseURL } from "./Config";

import Login from "../views/auth/Login";
import Dashboard from "../views/Dashboard";
import AddPatient from "../views/AddPatient";
import PredictLos from "../views/PredictLos";
import PredictResult from "../views/PredictResult";
import History from "../views/History";
import DetailLos from "../views/DetailLos";

const RoutesApp = () => {
  const [data, setData] = useState({
    role: "",
    loading: true,
  });
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${baseURL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData({ role: res.data.data.role, loading: false });
        })
        .catch((err) => {
          setData({ role: "", loading: false });
        });
    } else {
      setData({ role: "", loading: false });
    }
  }, [token]);


  if (data.loading) {
    return <div>Loading...</div>; // Render loading state
  }

  function getProtectedRoute(path, component, allowedRoles) {
    if (allowedRoles.includes(data.role)) {
      return <Route path={path} element={component} />;
    } else {
      return <Route path={path} element={<Navigate to="/login" />} />;
    }
  }

  return (
    <Router>
      <Routes>
        {getProtectedRoute("/", <Dashboard />, ["admin"])}
        {getProtectedRoute("/add-patient", <AddPatient />, ["admin"])}
        {getProtectedRoute("/predict/:id", <PredictLos />, ["admin"])}
        {getProtectedRoute("/predict-result", <PredictResult />, ["admin"])}
        {getProtectedRoute("/history/:id", <History />, ["admin"])}
        {getProtectedRoute("/detail-los/:id", <DetailLos />, ["admin"])}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
