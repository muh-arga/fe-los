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
import EditPatient from "../views/EditPatient";
import PredictLos from "../views/PredictLos";
import PredictResult from "../views/PredictResult";
import History from "../views/History";
import DetailLos from "../views/DetailLos";
import Rooms from "../views/Rooms";

import AdminDashboard from "../views/admin/Dashboard";
import EditUser from "../views/admin/EditUser";
import ApproveUser from "../views/admin/ApproveUser";
import AdminRooms from "../views/admin/AdminRooms";
import AdminBeds from "../views/admin/AdminBeds";
import EditBed from "../views/admin/EditBed";
import AddBed from "../views/admin/AddBed";
import AddRoom from "../views/admin/AddRoom";
import Register from "../views/auth/Register";

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
        {getProtectedRoute("/", <Dashboard />, ["user"])}
        {getProtectedRoute("/add-patient", <AddPatient />, ["user"])}
        {getProtectedRoute("/edit-patient/:id", <EditPatient />, ["user"])}
        {getProtectedRoute("/predict/:id", <PredictLos />, ["user"])}
        {getProtectedRoute("/predict-result", <PredictResult />, ["user"])}
        {getProtectedRoute("/history/:id", <History />, ["user"])}
        {getProtectedRoute("/detail-los/:id", <DetailLos />, ["user"])}
        {getProtectedRoute("/rooms", <Rooms />, ["user"])}

        {getProtectedRoute("/admin", <AdminDashboard />, ["admin"])}
        {getProtectedRoute("/admin/edit-user/:id", <EditUser />, ["admin"])}
        {getProtectedRoute("/approve", <ApproveUser />, ["admin"])}
        {getProtectedRoute("/rooms/admin", <AdminRooms />, ["admin"])}
        {getProtectedRoute("/rooms/admin/add-room", <AddRoom />, ["admin"])}
        {getProtectedRoute("/rooms/admin/:room", <AdminBeds />, ["admin"])}
        {getProtectedRoute("/rooms/admin/add-bed/:room", <AddBed />, ["admin"])}
        {getProtectedRoute("/rooms/admin/beds/:id", <EditBed />, ["admin"])}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
