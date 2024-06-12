import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../routes/Config";

import Sidebar from "../components/Sidebar";
import AdminSidebar from "../components/AdminSidebar";

const AppLayout = ({ children }) => {
  const [data, setData] = useState([{ role: "", loading: true, sidebar: "" }]);
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
          if (res.data.data.role === "admin") {
            setData({
              role: res.data.data.role,
              loading: false,
              sidebar: <AdminSidebar />,
            });
          } else {
            setData({
              role: res.data.data.role,
              loading: false,
              sidebar: <Sidebar />,
            });
          }
        })
        .catch((err) => {
          setData({ role: "", loading: false });
        });
    } else {
      setData({ role: "", loading: false });
    }
  }, [token]);

  return (
    <div>
      <div id="sidebar">{data.sidebar}</div>
      <div id="main">{children}</div>
    </div>
  );
};

export default AppLayout;
