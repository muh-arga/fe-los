import React, { Children } from "react";
import { NavLink, useLocation } from "react-router-dom";

const CustomNavLink = ({ to, paths, children }) => {
  const location = useLocation();

  const isActive = () => {
    const currentParentPath = location.pathname.split("/")[1];

    return paths.some((path) => {
      const parentPath = path.split("/")[1];
      return currentParentPath === parentPath;
    });
  };

  return (
    <NavLink to={to} className={`sidebar-link ${isActive() ? 'active' : ''}`}>
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
