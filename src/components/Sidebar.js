import React from"react";
import { NavLink } from"react-router-dom";

export const Sidebar = () => {
  return (
    <div>
      <div className="sidebar-wrapper active min-vh-100">
        <div className="sidebar-header position-relative">
          <div className="d-flex justify-content-start align-items-center">
            <div className="logo px-4">
              <a href="index.html" className="d-flex align-items-center text-decoration-none text-dark">
                <img
                  src="assets/img/logo.png"
                  alt="Logo"
                  style={{ width:"50px", height:"50px"}}
                />
                <h5 className="fw-bold ms-2">LosPrediction</h5>
              </a>
            </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu mt-4">
            <li className="sidebar-title text-start mt-0">Menu</li>
            <li className="sidebar-item active">
              <NavLink to="/" className="sidebar-link">
                <i className="bi bi-grid-fill"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
