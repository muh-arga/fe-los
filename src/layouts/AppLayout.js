import React, { ReactNode } from "react";

import Sidebar from "../components/Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div>
      <div id="sidebar">
        <Sidebar />
      </div>
      <div id="main">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
